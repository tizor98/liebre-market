'use strict'

import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import process from 'process'
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
import configModels from '../config/config.js'
const config = configModels[env]

let sequelize
if (config.use_env_variable) {
   sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
   sequelize = new Sequelize(config.database, config.username, config.password, config)
}

let fileNames = fs.readdirSync(__dirname)
   .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') })

const db = {}

await readModels()

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db

async function readModels() {   

   await Promise.all(fileNames
      .map(async file => {
         const { model } = await import(`./${file}`)
         const classModel = model(sequelize, Sequelize.DataTypes)
         db[classModel.name] = classModel
      })
   )

   Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
         db[modelName].associate(db)
      }
   })
}