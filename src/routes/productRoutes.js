import express from 'express'

import productController from '../controllers/productController.js'

import upload from '../middlewares/uploadProduct.js'

const router = express.Router()

router.get('/', productController.list)

router.get('/create', productController.store)
router.post('/create', productController.create)

router.get('/detail/:id', productController.detail)

router.get('/edit/:id', productController.edit)
router.put('/edit/:id', productController.update)
router.delete('/edit/:id', productController.destroy)

export default router