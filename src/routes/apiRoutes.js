import express from "express"

import productApiController from "../controllers/apiController.js"

const router = express.Router()

router.post('/products', productApiController.index)
router.post('/users/cart', productApiController.saveCartInfo)

export default router
