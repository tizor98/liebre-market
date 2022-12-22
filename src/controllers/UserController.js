import bcrypt from 'bcrypt'
import path from 'path'
import { unlinkSync } from 'fs'

import db from '../database/models/index.js'
const sequelize = db.sequelize // To introduce transactions in db

const defaultImg = 'userDefault.png'
const pathImgFolder = '../../public/img/users'
const errorHandler = (err) => console.error(err)

const controller = {
   
   register: async (req, res) => {

      const countries = await db.Countries.findAll({
         order: ['name']
      })

      const categories = await db.Categories.findAll()
      
      res.render('./users/register', {countries, categories})

   },

   addUser: async (req, res) => {

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
         
         if(req.body.categories) {
            for(let i=0; i<=req.body.categories.length; i++) {   
               await user.addCategories(req.body.categories[i], { transaction: t })
               // With through: {colName1: value1, colname2: value2, ...} can be added colums in the pivot table
            }
         }

         await user.addPayments(await db.Payments.findOne({ attributes: ['id'], where: {name: 'Cash'}}), { transaction: t })

         await user.addPayments(await db.Payments.findOne({ attributes: ['id'], where: {name: 'PSE'}}), { transaction: t })

         await t.commit()

      }
      catch(err) {
         errorHandler(err)
         await t.rollback()
      }

      res.redirect('/users/login')

   },

   login: (req, res) => res.render('./users/login'),

   checkLogin: async (req, res) => {

      // Search for user based on email
      const user = await db.Users.findOne({
         where: {email: req.body.email},
         include: [{association: 'Countries'}, {association: 'Categories'}]
      })

      if(user) {
         // Check whether password is correct
         if( bcrypt.compareSync(req.body.password, user.password) ) {
            // Delete password for safety before store user in session
            delete user.password
            // Store user in session
            req.session.userLogged = user
            // Create cookie in case user allow it
            req.body.recall ? res.cookie('userLogged', user.email, {maxAge: 1000 * 60 * 5}) : null // Cookie is store for 5min

            res.redirect('/users/profile')
         } else {
            res.render('./users/login', {errorPassword: 'password is incorrect'})
         }

      } else {
         res.render('./users/login', {errorEmail: 'email is incorrect'})
      }

   },

   profile: (req, res) => res.render('users/profile', {user: req.session.userLogged}),

   logout: (req, res) => {

      req.session.userLogged = undefined

      res.redirect('/')

   },

   edit: async (req, res) => {

      const countries = await db.Countries.findAll({
         order: ['name']
      })

      const categories = await db.Categories.findAll()

      res.render('./users/editProfile', {user: req.session.userLogged, countries, categories})

   },

   update: async (req, res) => {

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
            where: {id: req.session.userLogged.id},
            transaction: t
         })
         
         const user = await db.Users.findByPk(req.session.userLogged.id, {
            include: [{association: 'Countries'}, {association: 'Categories'}]
         })
   
         let categoryToAdd = req.body.categories
         req.session.userLogged.Categories.forEach( async category => {
            let categoryToDelete = true
            for(let i=0; i<=req.body.categories.length; i++) {
               if(category.id == req.body.categories[i]) {
                  categoryToDelete = false
                  categoryToAdd = categoryToAdd.filter( e => e != category.id)
               }
            }
            if(categoryToDelete) {
               await user.removeCategories(category.id, { transaction: t })
            }
         })
   
         for(let i=0; i<categoryToAdd.length; i++) {
            await user.addCategories(categoryToAdd[i], { transaction: t })
         }

         await t.commit()
         
         if(req.file) {
            req.session.userLogged.img_profile === defaultImg ? null : unlinkSync(path.resolve(pathImgFolder, req.session.userLogged.img_profile))
         }

         req.session.userLogged = await db.Users.findByPk(req.session.userLogged.id, {
            include: [{association: 'Countries'}, {association: 'Categories'}]
         })

      }
      catch(err) {
         errorHandler(err)
         await t.rollback()
      }
      
      res.redirect('/users/profile')

   },

   payment: (req, res) => res.render('./users/editPayment', {user: req.session.userLogged}),

   updatePayment: (req, res) => {

   },

   cart: (req, res) => res.render('./users/cart')

}

export default controller