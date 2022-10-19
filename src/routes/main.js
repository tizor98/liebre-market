const express = require("express");

const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.homepage);

router.get("/new-product", mainController.addProduct);

module.exports = router;