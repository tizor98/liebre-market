import { check } from "express-validator"
import bcrypt from 'bcrypt'
import db from '../../database/models/index.js'

export default [
   
   check('email').trim().notEmpty().withMessage('Email is mandatory').bail()
      .isEmail().withMessage('Email must be in a correct format: "example@domain.exam"').bail()
      .custom(async value => {
         if(!(await db.Users.count({where: {email: value}}))) throw new Error('Email is not registered')
         return true
      }),
   
   check('password').trim().notEmpty().withMessage('Password is mandatory').bail()
      .custom(async (value, { req }) => {
         const user = await db.Users.findOne({
            where: {
               email: req.body.email
            },
            attributes: ['password']
         })
         if(user) {
            const isCorrect = bcrypt.compareSync(value, user.dataValues.password)
            if(!isCorrect) throw new Error('Password is incorrect, try again')
         }
         return true
      })
]