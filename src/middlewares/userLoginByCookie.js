import db from '../database/models/index.js'

export default async function userLogin(req, res, next) {
   // Ask if the cookie exists
   if(req.cookies.userLogged) {
      
      // Filter user for email
      const user = await db.Users.findOne({
         where: {email: req.cookies.userLogged}
      })
      
      // Delete password for safety
      delete user.dataValues.password
      
      // Store user in session
      req.session.userLogged = user.dataValues
      
      res.redirect("/users/profile")
      
   } else {
      // If cookie does not exist, it continues with the next middleware or controller
      next()
   }
}