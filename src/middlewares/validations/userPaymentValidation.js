import { check } from "express-validator"
import db from "../../database/models/index.js";

export default [

   check('email').trim().isLength({max:96}).isEmail().withMessage('You must submit a valid email').bail(),

   check('name').trim().isLength({min:4, max: 96}).withMessage('At least 4 characters and max 50'),

   check('dni').trim().isLength({min:6, max:50}).withMessage('At least 6 characters and max 50'),

   check('address').trim().isLength({min:4, max: 50}).withMessage('At least 4 characters and max 50'),

   check('type').notEmpty().withMessage('You must select one').bail()
      .custom( value => {
         if(value === 'cc' || value === 'dc') return true
         throw new Error('You must choose one valid option')
      }),

   check('ccn').isCreditCard().withMessage('You must introduce a valid credit card number'),

   check('cce').custom( value => {
      const validDate = /^(0[1-9]|1[0-2])\/([2-9][0-9])$/
      const isValid = validDate.test(value)
      if(!isValid) throw new Error('Must be formatted as MM/YY')
      return true
   }),

   check('cvv').isInt().withMessage('Must be a 3-digit number').bail()
      .custom( value => {
         const validCVV = /^\d{3,3}$/
         const isValid = validCVV.test(value)
         if(!isValid) throw new Error('Must be a 3-digit number')
         return true
      })

]