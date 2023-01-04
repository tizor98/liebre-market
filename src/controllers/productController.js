import db from '../database/models/index.js'
const sequelize = db.sequelize // To introduce transactions in db

const defaultImg = 'placeholder-image.png'
const pathImgFolder = '../../public/img/products'
const errorHandler = (err) => console.error(err)

const controller = {

   list: (req, res) => {
      res.send('Hi')
   },

   admin: (req, res) => {
      res.send('Hi')
   },

   store: (req, res) => {

   },

   create: (req, res) => {

   },

   detail: (req, res) => {

   },

   edit: (req, res) => {

   },

   update: (req, res) => {

   },

   destroy: (req, res) => {

   }

}

export default controller