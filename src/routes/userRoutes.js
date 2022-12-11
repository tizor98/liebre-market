const express = require('express')

const userController = require('../controllers/UserController')

const upload = require('../middlewares/uploadUser')
const userRouteCheck = require('../middlewares/userRouteCheck')
const userLoginByCookie = require('../middlewares/userLoginByCookie')

const router = express.Router()

router.get('/register', userRouteCheck.forGuests, userController.register)

router.post('/register', upload.single('img_profile'), userController.addUser)

router.get('/login', userRouteCheck.forGuests, userLoginByCookie, userController.login);

router.post('/login', userController.checkLogin)

router.get('/profile', userRouteCheck.forUsers, userController.profile)

router.get('/edit/:id', userRouteCheck.forUsers, userController.edit)

router.post('/edit/:id', userController.update)

router.get('/cart', userController.cart)

module.exports = router