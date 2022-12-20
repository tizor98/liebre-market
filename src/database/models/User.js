'use strict'

const { Sequelize, DataTypes, Model } = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const conecctionconfig = require(__dirname + '/../config/config.js')[env]

const sequelize = new Sequelize(conecctionconfig)

const alias = 'Users'
const cols = {
   id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
   },
   email: {
      type: DataTypes.STRING(90),
      unique: true,
      allowNull: false
   },
   name: {
      type: DataTypes.STRING(45),
      allowNull: false
   },
   surname: {
      type: DataTypes.STRING(45),
      allowNull: false
   },
   dni: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   password: {
      type: DataTypes.TEXT,
      allowNull: false
   },
   address: {
      type: DataTypes.STRING(45),
   },
   birthday: {
      type: DataTypes.DATE
   },
   country_id: {
      type: DataTypes.SMALLINT,
      references: "countries", // nombre de tabla en db
      referencesKey: "id" // nombre de col en db
   },
   img_profile: {
      type: DataTypes.STRING(90)
   }
}
const config = {
   tableName: 'users',
   timestamps: true,
   paranoid: true
}

class User extends Model {}

User.init(
   {cols},
   {config, sequelize, modelname: alias}
)


User.belongsTo(sequelize.models.Countries, {
   as: 'Countries',
   foreignKey: 'country_id'
})

User.belongsToMany(sequelize.models.Categories, {
   as: 'Categories',
   through: 'UserCategories',
   foreignKey: 'user_id',
   otherKey: 'category_id'
})

User.belongsToMany(sequelize.models.Payments, {
   as: 'Payments',
   through: 'UserPayments',
   foreignKey: 'user_id',
   otherKey: 'payment_id'
})

module.exports = User