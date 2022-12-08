const express = require('express')

const userController = require('../controllers/UserController')

const router = express.Router()

router.get('/register', userController.register)

router.post('/register', userController.addUser)

router.get('/login', userController.login);

router.post('/login', userController.checkLogin)

router.get('/profile', userController.profile)

router.get('/cart', userController.cart)

module.exports = router