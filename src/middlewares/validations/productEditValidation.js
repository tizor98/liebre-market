import { check } from "express-validator"
import db from '../../database/models/index.js'
const Op = db.Sequelize.Op

export default [
   check('name').trim().isLength({min:5}).withMessage('Product name must be of at least 5 characters').bail()
      .custom( async (value, { req } ) => {
         let products = []
         try {
            products = await db.Products.findAll({
               where: {
                  id: {
                     [Op.ne]: req.params.id
                  },
                  seller_id: req.session.userLogged.id
               },
               attributes: ['name']
            })
         } catch (err) {
            console.error(err)
         }

         if(products.some( product => product.dataValues.name === value)) {
            throw new Error("You already have a product with the same name")
         }
         return true
      }),

   check('price').isNumeric().withMessage('Price must be an integer value'),

   check('category').custom( async value => {
      if (!value) return true
      const categories = await db.Categories.findAll({
         attributes: ['id']
      })
      const isValid = categories.some(category => value.includes(String(category.dataValues.id)));
      if (!isValid) throw new Error('You must provide a valid category code')
      return true
   }),

   check('description').trim().isString().isLength({min: 20}).withMessage('Description must be of at least 20 characters'),

   check('discount').isInt({min:0, max:100}).withMessage('Must be a numeric value between 0 and 100'),
]