import path from 'path'
import { unlinkSync } from 'fs'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
         
         res.json(products)
      }

      catch(err) {
         errorHandler(err)
         res.redirect('/')
      }
   },

   async admin(req, res) {

      try{

         const products = await db.Products.findAll({
            where: {seller_id : req.session.userLogged.id},
            include: [{association: 'Imgs', where: {main_img: true}}]
         })
         
         res.json(products)
      }

      catch(err) {
         errorHandler(err)
         res.redirect('/users/profile')
      }

   },

   async store(req, res) {

      const categories = await db.Categories.findAll()

      res.render('./products/store', {categories})

   },

   async create(req, res) {

      const t = await sequelize.transaction()
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
            for(let i=0; i<req.files.length; i++) {
               await db.ProductImgs.create({
                  product_id: product.id,
                  img: req.files[i].filename,
                  main_img: i == 0 ? true : false
               }, {
                  transaction: t
               })
            }
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
      }

      catch(err) {
         errorHandler(err)
         await t.rollback()
      }

      finally {
         res.redirect('/products/admin/dashboard')
      }
   },

   async detail(req, res) {

      try{

         const product = await db.Products.findAll({
            where: {id: req.params.id},
            include: [{association: 'Imgs'}]
         })
         
         res.send(product)
      }

      catch(err) {
         errorHandler(err)
         res.redirect('/products')
      }
   },

   async edit(req, res) {

      try{

         const product = await db.Products.findByPk(req.params.id, {
            include: [{association: 'Imgs'}]
         })
         const categories = await db.Categories.findAll()
         
         res.render('./products/edit', { product, categories })
      }

      catch(err) {
         errorHandler(err)
         res.redirect('/products/admin/dashboard')
      }
   },

   async update(req, res) {

      const t = await sequelize.transaction()
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
      }

      catch(err) {
         errorHandler(err)
         await t.rollback()
      }

      finally {
         res.redirect('/products/admin/dashboard')
      }
   },

   async destroy(req, res) {

      const t = await sequelize.transaction()
      try{
         // Search for product to delete
         const product = await db.Products.findByPk(req.params.id, {
            include: [{association: 'Imgs'}]
         })
         // Delete all product imgs
         for(let i=0; i<product.Imgs.length; i++) {
            product.Imgs[i].img === defaultImg ? null : unlinkSync(path.resolve(pathImgFolder, product.Imgs[i].img))
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
      }

      catch(err) {
         errorHandler(err)
         await t.rollback()
      }

      finally {
         res.redirect('/products/admin/dashboard')
      }
   }

}