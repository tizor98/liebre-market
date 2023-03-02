import path from 'path'
import { unlinkSync } from 'fs'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import { validationResult } from 'express-validator'

import db from '../database/models/index.js'
const sequelize = db.sequelize // To introduce transactions in db

const defaultImg = 'placeholder-image.png'
const pathImgFolder = path.resolve(__dirname, '../../public/img/products')
const errorHandler = (err) => console.error(err)

// Controller
export default {

   async list(req, res) {

      try{

         const products = await db.Products.findAll({
            include: [{association: 'Imgs'}]
         })
         const categories = await db.Categories.findAll()
         
         res.status(200).render('./products/list', { products, categories })
      }

      catch(err) {
         errorHandler(err)
         res.status(500).redirect('/')
      }
   },

   async admin(req, res) {

      try{

         const products = await db.Products.findAll({
            where: {seller_id : req.session.userLogged.id},
            include: [{association: 'Imgs', where: {main_img: true}}]
         })
         
         res.status(200).render('./products/admin', {products})
      }

      catch(err) {
         errorHandler(err)
         res.status(500).redirect('/users/profile')
      }

   },

   async store(req, res) {

      const categories = await db.Categories.findAll()

      res.status(200).render('./products/store', {categories})

   },

   async create(req, res) {

      const resultValidations = validationResult(req)

      if(resultValidations.errors.length > 0) {

         req.files.forEach(file => {
            try {
               unlinkSync(file.path)
            } catch {
               console.error('File to delete was not found')
            }
         })

         res.render('./products/store', {
            errors: resultValidations.mapped(),
            oldData: req.body,
            categories: await db.Categories.findAll() || []
         })

         return

      }

      const t = await sequelize.transaction()
      let stat
      try {
         // Add the new product
         const product = await db.Products.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            seller_id: req.session.userLogged.id,
            category_id: req.body.category
         }, {
            transaction: t
         })
         // If there are imgs, add them. If not, add the default img for products
         if(req.files.length > 0) {
            const imgs = []
            for(let i=0; i<req.files.length; i++) {
               imgs.push({
                  product_id: product.id,
                  img: req.files[i].filename,
                  main_img: i === 0
               })
            }
            await db.ProductImgs.bulkCreate(imgs, {
               transaction: t
            })
         } else {
            await db.ProductImgs.create({
               product_id: product.id,
               img: defaultImg,
               main_img: true
            }, {
               transaction: t
            })
         }

         await t.commit()
         stat = 201
      }

      catch(err) {
         errorHandler(err)
         await t.rollback()
         stat = 400
      }

      finally {
         res.status(stat).redirect('/products/admin/dashboard')
      }

   },

   async detail(req, res) {

      try{

         const product = await db.Products.findByPk(req.params.id, {
            include: [{association: 'Imgs'}]
         })

         res.status(200).render('./products/detail', {product})
      }

      catch(err) {
         errorHandler(err)
         res.status(500).redirect('/products')
      }
   },

   async edit(req, res) {

      try{

         const product = await db.Products.findByPk(req.params.id, {
            include: [{association: 'Imgs'}]
         })
         const categories = await db.Categories.findAll()
         
         res.status(200).render('./products/edit', { product, categories })
      }

      catch(err) {
         errorHandler(err)
         res.status(500).redirect('/products/admin/dashboard')
      }
   },

   async update(req, res) {

      const resultValidations = validationResult(req)

      if(resultValidations.errors.length > 0) {

         res.render('./products/edit', {
            errors: resultValidations.mapped(),
            product: {...req.body, id: req.params.id, category_id: req.body.category },
            categories: await db.Categories.findAll() || []
         })

         return

      }

      const t = await sequelize.transaction()
      let stat
      try {
         // Update product
         const product = await db.Products.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            seller_id: req.session.userLogged.id,
            category_id: req.body.category
         }, {
            where: {id: req.params.id},
            transaction: t
         })

         await t.commit()
         stat = 200
      }

      catch(err) {
         errorHandler(err)
         await t.rollback()
         stat = 400
      }

      finally {
         res.status(stat).redirect('/products/admin/dashboard')
      }
   },

   async destroy(req, res) {

      const t = await sequelize.transaction()
      let stat
      try{
         // Search for product to delete
         const product = await db.Products.findByPk(req.params.id, {
            include: [{association: 'Imgs'}]
         })
         // Delete all product imgs
         for(let i=0; i<product.Imgs.length; i++) {
            if(!(product.Imgs[i].img === defaultImg)) {
               try {
                  unlinkSync(path.resolve(pathImgFolder, product.Imgs[i].img))
               }
               catch (err) {
                  errorHandler(err)
               }
            }
         }
         
         // Delete product
         await db.ProductImgs.destroy({
            where: {product_id: req.params.id},
            transaction: t
         })
         await db.Products.destroy({
            where: {id: req.params.id},
            transaction: t
         })

         await t.commit()
         stat = 200
      }

      catch(err) {
         errorHandler(err)
         await t.rollback()
         stat = 400
      }

      finally {
         res.status(stat).redirect('/products/admin/dashboard')
      }
   }

}