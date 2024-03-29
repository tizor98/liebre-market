import { check } from "express-validator"
import db from '../../database/models/index.js'
import path from 'path'

export default [

   check('email').trim().isLength({max:90}).isEmail().withMessage('You must submit a valid email').bail()
      .custom(async (value, { req }) => {
         if(value === req.session.userLogged.email) return true
         if(await db.Users.count({where: {email: value}})) throw new Error('This email already is registered')
         return true
      }).bail(),
   
   check('name').trim().isLength({min:4, max: 50}).withMessage('At least 4 characters and max 50'),
   
   check('surname').trim().isLength({min:4, max: 50}).withMessage('At least 4 characters and max 50'),
   
   check('dni').trim().isLength({min:6}).withMessage('At least 6 characters'),
   
   check('address').trim().isLength({min:4, max: 50}).withMessage('At least 4 characters and max 50'),
   
   check('birthday').trim().isDate().withMessage('Must be a correct date'),
   
   check('country_id').custom( async (value, { req }) => {
      if(value) {
         if(parseInt(value) === req.session.userLogged.country_id) return true
         const existInDb = await db.Countries.count({
            where: {id: value}
         })
         if(!existInDb) throw new Error('You must provide a valid country code')
         return true
      } else {
         throw new Error('You must provide a valid country code')
      }
   }),
   
   check('categories').custom( async value => {
      if(!value) return true
      const categories = await db.Categories.findAll({
         attributes: ['id']
      })
      const isValid = categories.some( category => value.includes(String(category.dataValues.id)));
      if(!isValid) throw new Error('You must provide a valid category code')
      return true
   }),
   
   check('img_profile').custom((value, { req }) => {
      if(req.file) {
         const extension = (path.extname(req.file.originalname)).toLowerCase()
         if(!(['.jpg', '.png', '.jpeg', '.webp'].includes(extension))) {
            throw new Error('Image file must be of type: .jpg, .png, .jpeg or .webp')
         }
      }
      return true
   }),
   
]