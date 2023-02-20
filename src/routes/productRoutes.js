import express from 'express'

import productController from '../controllers/productController.js'

import uploadResolver from '../middlewares/upload.js'
const upload = uploadResolver('products') // Subfolder in img to store incoming images

import { forUsers } from '../middlewares/userRouteCheck.js'
import productCreateValidation from "../middlewares/validations/productCreateValidation.js"
import productEditValidation from "../middlewares/validations/productEditValidation.js"

const router = express.Router()

router.get('/', productController.list)
router.get('/:id', productController.detail)

router.get('/admin/dashboard', forUsers, productController.admin)

router.get('/admin/create', forUsers, productController.store)
router.post('/admin/create', forUsers, upload.array('productImg'), productCreateValidation, productController.create)

router.get('/admin/edit/:id', forUsers, productController.edit)
router.put('/admin/edit/:id', forUsers, productEditValidation, productController.update)
router.delete('/admin/edit/:id', forUsers, productController.destroy)

export default router