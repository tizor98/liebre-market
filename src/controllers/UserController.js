const controller = {
   
   register: (req, res) => res.render('./users/register'),

   addUser: (req, res) => res.render('add'),

   login: (req, res) => res.render('./users/login'),

   checkLogin: (req, res) => res.redirect('/user/profile'),

   profile: (req, res) => res.render('users/profile'),

   cart: (req, res) => res.render('./users/cart')

}

module.exports = controller