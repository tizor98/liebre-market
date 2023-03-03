import { check } from "express-validator"
import path from 'path'
import db from '../../database/models/index.js'

export default [
   check('name').trim().isLength({min:5, max:45}).withMessage('Product name must be of at least 5 characters and max 45').bail()
      .custom( async value => {
         let products = []
         try {
            products = await db.Products.findAll({
            attributes: ['name']
            })
         } catch (err) {
            console.error(err)
         }

         if(products.some( product => product.dataValues.name === value)) {
            throw new Error("A product with the same name already exists")
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

   check('productImg').custom( (value, { req }) => {

      const acceptedExt = ['.jpg', '.png', '.jpeg', '.webp']

      req.files.forEach( file => {
         const extension = path.extname(file.filename)
         if (!acceptedExt.includes(extension)) {
            throw new Error('You have to upload an image with the following extensions:' + acceptedExt.join(', '))
         }
      })

      return true
   }),

   check('discount').isInt({min:0, max:100}).withMessage('Must be a numeric value between 0 and 100'),
]