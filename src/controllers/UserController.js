import bcrypt from 'bcrypt'
import path from 'path'
import { unlinkSync } from 'fs'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import { validationResult } from 'express-validator'

import db from '../database/models/index.js'
const sequelize = db.sequelize // To introduce transactions in db

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

         res.status(200).render('./users/register', { countries, categories })
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
            categories: await db.Categories.findAll() || []
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

   login(req, res) { res.status(200).render('./users/login') },

   async checkLogin(req, res) {

      const resultValidations = validationResult(req)

      if(resultValidations.errors.length > 0) {
         res.render('./users/login', {
            errors: resultValidations.mapped(),
            oldData: req.body
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

   createPaymentMethod(req, res) { res.status(200).render('./users/editPayment') },

   async storePaymentMethod(req, res) {

      const resultValidations = validationResult(req)
      
      if(resultValidations.errors.length > 0) {
         res.render('./users/editPayment', {
            errors: resultValidations.mapped(),
            oldData: req.body,
         })
      } else {

         const t = await sequelize.transaction()
         try {

            await db.Payments.create({
               type: req.body.type,
               number: req.body.ccn,
               expiration: req.body.cce,
               cvv: req.body.cvv,
               user_id: req.session.userLogged.id
            }, {
               transaction: t
            })

            await t.commit()

            res.status(201).redirect('/users/profile')
         }

         catch (err) {
            errorHandler(err)
            await t.rollback()
            res.status(400).redirect('/users/payment')
         }
      }

   },

   cart(req, res) { res.status(200).render('./users/cart') }

}