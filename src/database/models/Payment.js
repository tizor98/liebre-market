'use strict'

const { Sequelize, DataTypes, Model } = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const conecctionconfig = require(__dirname + '/../config/config.js')[env]

const sequelize = new Sequelize(conecctionconfig)

const alias = 'Payments'
const cols = {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: DataTypes.STRING(45),
      allowNull: false
   },
   allUsers: DataTypes.BOOLEAN
}
const config = {
   tableName: 'payment_methods',
   timestamps: true,
   paranoid: true
}

class Payment extends Model {}

Payment.init(
   {cols},
   {config, sequelize, modelName: alias}
)

Payment.belongsToMany(sequelize.models.Users, {
      as: 'Users',
      through: 'UserPayments',
      foreignKey: 'payment_id',
      otherKey: 'user_id'
})

module.exports = Payment