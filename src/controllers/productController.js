import db from '../database/models/index.js'
const sequelize = db.sequelize // To introduce transactions in db

const defaultImg = 'placeholder-image.png'
const pathImgFolder = '../../public/img/products'
const errorHandler = (err) => console.error(err)

// Controller
export default {

   async list(req, res) {

      try{

         const products = await db.Products.findAll({
            include: [{association: 'Imgs'}]
         })
         
         res.send(products)
      }

      catch(err) {
         errorHandler(err)
         res.redirect('/')
      }
   },

   async admin(req, res) {

      try{

         const products = await db.Products.findAll({
            where: {seller_id : req.session.userLogged.id},
            include: [{association: 'Imgs'}]
         })
         
         res.send(products)
      }

      catch(err) {
         errorHandler(err)
         res.redirect('/users/profile')
      }

   },

   async store(req, res) {

      const categories = await db.Categories.findAll()

      res.render('./products/store', {categories})

   },

   async create(req, res) {

      const t = await sequelize.transaction()
      try {

         const product = await db.Products.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            seller_id: req.body.seller_id,
            category_id: req.body.category_id
         }, {
            transaction: t
         })

         // include the create for img in ProductImgs model

         await t.commit()
      }

      catch(err) {
         errorHandler(err)
         await t.rollback()
      }
   },

   async detail(req, res) {

      try{

         const product = await db.Products.findAll({
            where: {id: req.params.id},
            include: [{association: 'Imgs'}]
         })
         
         res.send(product)
      }

      catch(err) {
         errorHandler(err)
         res.redirect('/products')
      }
   },

   async edit(req, res) {

      try{

         const product = await db.Products.findAll({
            where: {id: req.params.id},
            include: [{association: 'Imgs'}]
         })
         
         res.send(product)
      }

      catch(err) {
         errorHandler(err)
         res.redirect('/products/admin')
      }
   },

   async update(req, res) {

      const t = await sequelize.transaction()
      try {

         const product = await db.Products.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            seller_id: req.body.seller_id,
            category_id: req.body.category_id
         }, {
            where: {id: req.params.id},
            transaction: t
         })

         // include the create for img in ProductImgs model

         await t.commit()
      }

      catch(err) {
         errorHandler(err)
         await t.rollback()
      }
   },

   async destroy(req, res) {

      const t = await sequelize.transaction()
      try{
         await db.Products.delete({
            where: {id: req.params.id},
            transaction: t
         })
         await t.commit
      }

      catch(err) {
         errorHandler(err)
         await t.rollback()
      }
   }

}