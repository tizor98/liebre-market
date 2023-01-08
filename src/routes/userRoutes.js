import express from 'express'

import userController from '../controllers/UserController.js'

import uploadResolver from '../middlewares/upload.js'
const upload = uploadResolver('users') // Subfolder in img to store incoming images

import { forGuests, forUsers } from '../middlewares/userRouteCheck.js'
import userLoginByCookie from '../middlewares/userLoginByCookie.js'

const router = express.Router()

router.get('/register', forGuests, userController.register)
router.post('/register', forGuests, upload.single('img_profile'), userController.addUser)

router.get('/login', forGuests, userLoginByCookie, userController.login)
router.post('/login', forGuests, userController.checkLogin)

router.get('/profile', forUsers, userController.profile)
router.post('/profile', forUsers, userController.logout)

router.get('/edit', forUsers, userController.edit)
router.put('/edit', forUsers, upload.single('img_profile'), userController.update)

router.get('/payment', forUsers, userController.payment)
router.put('/payment', forUsers, userController.updatePayment)

router.get('/cart', userController.cart)

export default router