import { check } from "express-validator"
import db from '../../database/models/index.js'
import path from 'path'

export default [

   check('email').trim().isLength({max:90}).isEmail().withMessage('You must submit a valid email').bail()
      .custom(async value => {
         if(await db.Users.count({where: {email: value}})) throw new Error('This email already is registered')
         return true
      }).bail(),
   
   check('name').trim().isLength({min:4, max: 50}).withMessage('At least 4 characters and max 50'),
   
   check('surname').trim().isLength({min:4, max: 50}).withMessage('At least 4 characters and max 50'),
   
   check('dni').trim().isLength({min:6}).withMessage('At least 6 characters'),
   
   check('address').trim().isLength({min:4, max: 50}).withMessage('At least 4 characters and max 50'),
   
   check('birthday').isDate().withMessage('Must be a correct date, you must have al least 18 years').bail()
      .custom( value => {
         const today = new Date()
         const clientDate = new Date(value)
         const timeDiff = today.getTime() - clientDate.getTime() // Result is in milliseconds
         const diffYears = Math.ceil((timeDiff / (1000 * 3600 * 24)) /365)
         if(diffYears > 18) {
            return true
         }
         throw new Error('Must be a correct date, you must have al least 18 years')
      }),
   
   check('country_id').custom( async value => {
      if(value) {
         const existInDb = await db.Countries.count({
            where: {id: value}
         })
         if(!existInDb) throw new Error('You must select a valid country')
         return true
      } else {
         throw new Error('You must select a valid country')
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
            throw new Error('Image file must be of type: .jpg, .png, .jpeg, or .webp')
         }
      }
      return true
   }),
   
   check('password').notEmpty().withMessage('Password can not be empty').bail()
      .custom( value => {
         const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
         const isValid = strongPassword.test(value)
         if(!isValid) {
            throw new Error('Mandatory: al least 8 characters, 1 upper case, 1 lower case, and 1 special character (@$!%*#?&)')
         }
         return true
      }).bail(),
   
   check('repassword').custom( (value, { req }) => {
      if(value !== req.body.password) throw new Error('Passwords do not match')
      return true
   })
]