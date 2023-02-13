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

      const countries = await db.Countries.findAll({
         order: ['name']
      })

      const categories = await db.Categories.findAll()

      res.status(200).render('./users/register', { countries, categories })

   },

   async addUser(req, res) {

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
            for (let i = 0; i <= req.body.categories.length; i++) {
               await user.addCategories(req.body.categories[i], { transaction: t })
               // With through: {colName1: value1, colname2: value2, ...} can be added colums in the pivot table
            }
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
      } else {

         try {
            // Search for user based on email
            const user = await db.Users.findOne({
               where: { email: req.body.email },
               attributes: { exclude: ['password'] },
               include: [{ association: 'Countries' }, { association: 'Categories' }]
            })

            req.session.userLogged = user.dataValues
            // Create cookie in case user allow it
            req.body.recall ? res.cookie('userLogged', user.dataValues.email, { maxAge: 1000 * 60 * 5 }) : null // Cookie is store for 5min

            res.status(200).redirect('/users/profile')

         }
         catch (err) {
            errorHandler(err)
            res.status(500).redirect('/users/login')
         }

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
         res.status(500).redirect('users/profile')
      }

   },

   async update(req, res) {

      const t = await sequelize.transaction()
      try {

         await db.Users.update({
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            dni: req.body.dni,
            address: req.body.address,
            birthday: req.body.birthday,
            country_id: req.body.country_id,
            img_profile: req.file ? req.file.filename : req.session.userLogged.img_profile
         }, {
            where: { id: req.session.userLogged.id },
            transaction: t
         })

         const user = await db.Users.findByPk(req.session.userLogged.id, {
            include: [{ association: 'Countries' }, { association: 'Categories' }]
         })

         let categoryToAdd = req.body.categories
         req.session.userLogged.Categories.forEach(async category => {
            let categoryToDelete = true
            for (let i = 0; i <= req.body.categories.length; i++) {
               if (category.id == req.body.categories[i]) {
                  categoryToDelete = false
                  categoryToAdd = categoryToAdd.filter(e => e != category.id)
               }
            }
            if (categoryToDelete) {
               await user.removeCategories(category.id, { transaction: t })
            }
         })

         for (let i = 0; i < categoryToAdd.length; i++) {
            await user.addCategories(categoryToAdd[i], { transaction: t })
         }

         await t.commit()

         if (req.file) {
            req.session.userLogged.img_profile === defaultImg ? null : unlinkSync(path.resolve(pathImgFolder, req.session.userLogged.img_profile))
         }

         req.session.userLogged = await db.Users.findByPk(req.session.userLogged.id, {
            include: [{ association: 'Countries' }, { association: 'Categories' }]
         })

         res.status(200).redirect('/users/profile')
      }

      catch (err) {
         errorHandler(err)
         await t.rollback()
         res.status(400).redirect('users/edit')
      }

   },

   createPaymentMethod(req, res) { res.status(200).render('./users/editPayment') },

   async storePaymentMethod(req, res) {

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
         res.status(400).redirect('/users/editPayment')
      }

   },

   cart(req, res) { res.status(200).render('./users/cart') }

}