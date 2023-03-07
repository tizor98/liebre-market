import db from '../database/models/index.js'
const Op = db.Sequelize.Op


// Controller
export default {

   async index(req, res) {

      try {
         const idProducts = Object.keys(req.body)

         const products = await db.Products.findAll({
            where: {
               id: {
                  [Op.or]: idProducts
               },
            },
            attributes: {exclude: ['createdAt', 'deletedAt', 'updatedAt', 'seller_id', 'category_id']} ,
            include: [{association: 'Imgs', where: {main_img:true}, attributes: {exclude: ['id', 'createdAt', 'deletedAt', 'updatedAt','main_img']}}]
         })

         res.status(200).json(products)

      }
      catch (err) {
         console.error(err)
         res.status(500).json({
            error: 'server side error'
         })
      }

   },

   saveCartInfo(req, res) {
      req.session.productsId = req.body
      res.send('hi')
   }

}