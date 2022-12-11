const bcrypt = require('bcrypt')

const db = require('../database/models')

const defaultImg = 'userDefault.png'

const controller = {
   
   register: async (req, res) => {

      const countries = await db.Countries.findAll({
         order: ['name']
      })
      
      res.render('./users/register', {countries})

   },

   addUser: async (req, res) => {

      await db.Users.create({
         email: req.body.email,
         name: req.body.name,
         surname: req.body.surname,
         dni: req.body.dni,
         password: bcrypt.hashSync(req.body.password, 10),
         address: req.body.address,
         date_of_birth: req.body.day_of_birth,
         country_id: req.body.country_id,
         img_profile: req.file ? req.file.filename : defaultImg
      })

      res.redirect('/users/login')

   },

   login: (req, res) => res.render('./users/login'),

   checkLogin: async (req, res) => {

      // Search for user based on email
      const user = await db.Users.findOne({
         where: {email: req.body.email}
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

   profile: (req, res) => res.render('users/profile'),

   cart: (req, res) => res.render('./users/cart')

}

module.exports = controller