import db from '../database/models/index.js'

// Controller
export default {
   
   async homepage(req, res) {
      try {
         const categories = await db.Categories.findAll()

         res.status(200).render('./index', {categories, user:req.session.userLogged})

      }
      catch (err) {
         console.error(err)
         res.status(404).render('./index', {categories: [], user:req.session.userLogged})
      }


   }
   
}