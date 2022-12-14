const express = require('express')

const userController = require('../controllers/UserController')

const upload = require('../middlewares/uploadUser')
const userRouteCheck = require('../middlewares/userRouteCheck')
const userLoginByCookie = require('../middlewares/userLoginByCookie')

const router = express.Router()

router.get('/register', userRouteCheck.forGuests, userController.register)

router.post('/register', userRouteCheck.forGuests, upload.single('img_profile'), userController.addUser)

router.get('/login', userRouteCheck.forGuests, userLoginByCookie, userController.login);

router.post('/login', userRouteCheck.forGuests, userController.checkLogin)

router.get('/profile', userRouteCheck.forUsers, userController.profile)

router.get('/edit', userRouteCheck.forUsers, userController.edit)

router.put('/edit', userRouteCheck.forUsers, upload.single('img_profile'), userController.update)

router.get('/payment', userRouteCheck.forUsers, userController.payment)

router.put('/payment', userRouteCheck.forUsers, userController.updatePayment)

router.get('/cart', userController.cart)

module.exports = router