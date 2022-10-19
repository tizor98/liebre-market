const express = require("express");

const router = express.Router();
const userController = require("../controllers/UserController");

router.get("/register", userController.register);

router.get("/login", userController.login);

module.exports = router;