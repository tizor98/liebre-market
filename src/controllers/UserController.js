const bcrypt = require('bcrypt')

const db = require('../database/models')

const defaultImg = 'userDefault.png'

const controller = {
   
   register: async (req, res) => {

      const countries = await db.Countries.findAll({
         order: ['name']
      })

      const categories = await db.Categories.findAll()
      
      res.render('./users/register', {countries, categories})

   },

   addUser: async (req, res) => {

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
      })

      if(req.body.categories) {
         for(let i=0; i<=req.body.categories.length; i++) {
            await db.UsersCategories.create({
               user_id: user.id,
               category_id: req.body.categories[i]
            })
         }
      }

      res.redirect('/users/login')

   },

   login: (req, res) => res.render('./users/login'),

   checkLogin: async (req, res) => {

      // Search for user based on email
      const user = await db.Users.findOne({
         where: {email: req.body.email},
         include: [{association: 'countries'}, {association: 'categories'}]
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

   edit: async (req, res) => {

      const countries = await db.Countries.findAll({
         order: ['name']
      })

      const categories = await db.Categories.findAll()

      res.render('./users/editProfile', {user: req.session.userLogged, countries, categories})

   },

   update: async (req, res) => {

      res.send(req.body)
      console.log(req.body);
      /* await db.Users.update({
         email: req.body.email,
         name: req.body.name,
         surname: req.body.surname,
         dni: req.body.dni,
         address: req.body.address,
         birthday: req.body.birthday,
         country_id: req.body.country_id,
         img_profile: req.file ? req.file.filename : req.session.userLogged.img_profile
      }, {
         where: {id: req.params.id}
      })

      // Falta eliminar la foto anterior en caso de que haya subido una nueva

      let categoryToAdd = req.body.categories
      req.session.userLogged.categories.forEach( async category => {
         let categoryToDelete = true
         for(let i=0; i<=req.body.categories.length; i++) {
            if(category.id == req.body.categories[i]) {
               categoryToDelete = false
               categoryToAdd = categoryToAdd.filter( e => e != category.id)
            }
         }
         if(categoryToDelete) {
            await db.UsersCategories.destroy({
               where: {user_id: req.session.userLogged.id, category_id: category.id}
            })
         }
      })

      for(let i=0; i<categoryToAdd.length; i++) {
         await db.UsersCategories.create({
            user_id: req.session.userLogged.id,
            category_id: categoryToAdd[i]
         })
      }
      
      req.session.userLogged = await db.Users.findByPk(req.session.userLogged.id, {
         include: [{association: 'countries'}, {association: 'categories'}]
      })
      
      res.redirect('/users/profile')
 */
   },

   cart: (req, res) => res.render('./users/cart')

}

module.exports = controller