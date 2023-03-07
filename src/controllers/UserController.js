import bcrypt from 'bcrypt'
import path from 'path'
import { unlinkSync } from 'fs'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import { validationResult } from 'express-validator'

import db from '../database/models/index.js'
const sequelize = db.sequelize // To introduce transactions in db
const Op = db.Sequelize.Op

const defaultImg = 'userDefault.png'
const pathImgFolder = path.resolve(__dirname, '../../public/img/users')
const errorHandler = (err) => console.error(err)

// Controller
export default {

   async register(req, res) {

      try {
         const countries = await db.Countries.findAll({
            order: ['name']
         })

         const categories = await db.Categories.findAll()

         res.status(200).render('./users/register', { countries, categories, user:req.session.userLogged})
      } catch (err) {
         errorHandler(err)
         res.status(500).redirect('/')
      }

   },

   async addUser(req, res) {

      const resultValidations = validationResult(req)

      if(resultValidations.errors.length > 0) {

         if(req.file) unlinkSync(req.file.path)

         res.render('./users/register', {
            errors: resultValidations.mapped(),
            oldData: req.body,
            countries: await db.Countries.findAll({order: ['name']}) || [],
            categories: await db.Categories.findAll() || [],
            user:req.session.userLogged
         })

         return

      }

      const t = await sequelize.transaction()
      try {

         const user = await db.Users.create({
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            dni: req.body.dni,
            password: bcrypt.hashSync(req.body.password, 10),
            address: req.body.address,
            birthday: req.body.birthday,
            country_id: req.body.country_id,
            img_profile: req.file ? req.file.filename : defaultImg
         }, {
            transaction: t
         })

         if (req.body.categories) {
            await user.addCategories(req.body.categories, { transaction: t })
         }

         await t.commit()

         res.status(201).redirect('/users/login')
      }

      catch (err) {
         errorHandler(err)
         await t.rollback()
         res.status(400).redirect('/users/register')
      }

   },

   login(req, res) { res.status(200).render('./users/login', {user:req.session.userLogged}) },

   async checkLogin(req, res) {

      const resultValidations = validationResult(req)

      if(resultValidations.errors.length > 0) {
         res.render('./users/login', {
            errors: resultValidations.mapped(),
            oldData: req.body,
            user:req.session.userLogged
         })

         return
      }

      try {
         // Search for user based on email
         const user = await db.Users.findOne({
            where: { email: req.body.email },
            attributes: { exclude: ['password'] },
            include: [{ association: 'Countries' }, { association: 'Categories' }]
         })

         req.session.userLogged = user.dataValues
         // Create cookie in case user allow it
         if(req.body.recall) res.cookie('userLogged', user.dataValues.email, { maxAge: 1000 * 60 * 5 }) // Cookie is store for 5min

         res.status(200).redirect('/users/profile')

      }
      catch (err) {
         errorHandler(err)
         res.status(500).redirect('/users/login')
      }

   },

   profile(req, res) { res.status(200).render('users/profile', { user: req.session.userLogged }) },

   logout(req, res) {

      req.session.userLogged = undefined

      res.status(200).redirect('/')

   },

   async edit(req, res) {

      try {
         const countries = await db.Countries.findAll({
            order: ['name']
         })

         const categories = await db.Categories.findAll()

         res.status(200).render('./users/editProfile', { user: req.session.userLogged, countries, categories })
      }
      catch (err) {
         errorHandler(err)
         res.status(500).redirect('/users/profile')
      }

   },

   async update(req, res) {

      const resultValidations = validationResult(req)

      if(resultValidations.errors.length > 0) {

         req.file ? unlinkSync(req.file.path) : null

         res.render('./users/editProfile', {
            errors: resultValidations.mapped(),
            user: req.body,
            countries: await db.Countries.findAll({order: ['name']}) || [],
            categories: await db.Categories.findAll() || []
         })

         return

      }

      const t = await sequelize.transaction()
      try {

         const updatedUser = {
            email: req.body.email === req.session.userLogged.email ? null : req.body.email,
            name: req.body.name === req.session.userLogged.name ? null : req.body.name,
            surname: req.body.surname === req.session.userLogged.surname ? null : req.body.surname,
            dni: req.body.dni == req.session.userLogged.dni ? null : req.body.dni,
            address: req.body.address === req.session.userLogged.address ? null : req.body.address,
            birthday: req.body.birthday == req.session.userLogged.birthday ? null : req.body.birthday,
            country_id: parseInt(req.body.country_id) === req.session.userLogged.country_id ? null : req.body.country_id,
            img_profile: req.file ? req.file.filename : null
         }

         Object.keys(updatedUser).forEach( value => updatedUser[value] === null && delete updatedUser[value])

         await db.Users.update(updatedUser, {
            where: { id: req.session.userLogged.id },
            transaction: t
         })

         const user = await db.Users.findByPk(req.session.userLogged.id, {
            include: [{ association: 'Countries' }, { association: 'Categories' }]
         })

         let categoriesToAdd = req.body.categories
         const categoriesToDelete = []
         for (const category of req.session.userLogged.Categories) {
            if(req.body.categories.includes(String(category.id))) {
               categoriesToAdd = categoriesToAdd.filter(e => e !== String(category.id))
            } else {
               categoriesToDelete.push(category.id)
            }
         }

         await user.addCategories(categoriesToAdd, { transaction: t })
         await user.removeCategories(categoriesToDelete, { transaction: t })

         await t.commit()

         if (req.file && !(req.session.userLogged.img_profile === defaultImg)) {
             unlinkSync(path.resolve(pathImgFolder, req.session.userLogged.img_profile))
         }

         req.session.userLogged = await db.Users.findByPk(req.session.userLogged.id, {
            include: [{ association: 'Countries' }, { association: 'Categories' }]
         })

         res.status(200).redirect('/users/profile')
      }

      catch (err) {
         errorHandler(err)
         await t.rollback()
         res.status(400).redirect('/users/edit')
      }

   },

   async cart(req, res) {

      try {

         let ids = [-1]
         if(Object.keys(req.session.productsId).length > 0) {
            ids = Object.keys(req.session.productsId)
         }

         const products = await db.Products.findAll({
            where: {
               id: {
                  [Op.or]: ids,
               },
            },
            attributes: {exclude: ['createdAt', 'deletedAt', 'updatedAt', 'seller_id', 'category_id']} ,
            include: [{association: 'Imgs', where: {main_img:true}, attributes: {exclude: ['id', 'createdAt', 'deletedAt', 'updatedAt','main_img']}}]
         })

         res.status(200).render('./users/cart', { products, user:req.session.userLogged, quantity: req.session.productsId })
      }
      catch (err) {
         errorHandler(err)
         res.redirect('/')
      }

   },

   async purchase(req, res) {

      const resultValidations = validationResult(req)

      if(resultValidations.errors.length > 0) {
         res.render('./users/cart', {
            errors: resultValidations.mapped(),
            oldData: req.body,
            user:req.session.userLogged
         })

         return
      }

      const productsReq = JSON.parse(req.body.products)

      let ids = [-1]
      if(Object.keys(productsReq).length > 0) {
         ids = Object.keys(productsReq)
      } else {
         res.status(400).redirect('/')
         return
      }

      const t = await sequelize.transaction()
      try {

         const products = await db.Products.findAll({
            where: {
               id: {
                  [Op.or]: ids,
               },
            },
            attributes: ['id', 'price', 'discount'],
         })

         const total = Object.entries(productsReq).reduce((sum, current) => {
            const product = products.find(product => product.dataValues.id === parseInt(current[0]))
            const sellingPrice = product.discount ? product.price * (1-product.discount/100) : product.price
            return sum + current[1] * sellingPrice
         }, 0)

         let invoiceToSave = {}
         if(req.session.userLogged) {
            invoiceToSave = {
               buyer_id: req.session.userLogged.id,
               card_type: req.body.type,
               card_number: req.body.ccn,
               card_exp: req.body.cce,
               card_cvv: req.body.cvv,
               total
            }
         } else {
            invoiceToSave = {
               buyer_full_name: req.body.name,
               buyer_email: req.body.email,
               buyer_dni: req.body.dni,
               buyer_address: req.body.address,
               card_type: req.body.type,
               card_number: req.body.ccn,
               card_exp: req.body.cce,
               card_cvv: req.body.cvv,
               total
            }
         }

         const invoice = await db.Invoices.create(invoiceToSave, {transaction: t})

         const productsToAdd = []
         Object.keys(productsReq).forEach(id => {
            const product = products.find(product => product.dataValues.id === parseInt(id))
            const sellingPrice = product.discount ? product.price * (1-product.discount/100) : product.price
            productsToAdd.push({
               invoice_id: invoice.dataValues.id,
               product_id: id,
               quantity: productsReq[id],
               selling_price: sellingPrice
            })
         })

         await db.InvoiceProducts.bulkCreate(productsToAdd, {transaction:t})

         await t.commit()
         res.status(201).render('./users/purchase', {user: req.session.userLogged, confirmation: true})

      } catch (err) {
         errorHandler(err)
         await t.rollback()
         res.status(500).render('./users/purchase', {user: req.session.userLogged, confirmation: false})
      }
   },

   async history(req, res) {
      try {

         const invoices = await db.Invoices.findAll({
            where: {
               buyer_id: req.session.userLogged.id,
            },
            attributes: ['id', 'buyer_id', 'card_type', 'card_number', 'total', 'createdAt'],
            include: {association: 'Products', attributes: ['name']},
         })

         res.render('./users/history', {user: req.session.userLogged, invoices})

      } catch (err) {
         errorHandler(err)
         res.redirect('/users/profile')
      }
   }

}