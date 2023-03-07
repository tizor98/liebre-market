export function model (sequelize, DataTypes) {

   const alias = 'Products'

   const cols = {
      id: {
         type: DataTypes.BIGINT,
         primaryKey: true,
         autoIncrement: true
      },
      name: {
         type: DataTypes.STRING(45),
         allowNull: false
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: false
      },
      price: {
         type: DataTypes.DOUBLE,
         allowNull: false
      },
      discount: {
         type: DataTypes.DOUBLE,
         default: null
      },
      seller_id: {
         type: DataTypes.BIGINT,
         allowNull: false
      },
      category_id: {
         type: DataTypes.INTEGER,
      }
   }

   const config = {
      tableName: 'products',
      timestamps: true,
      paranoid: true
   }

   const Product = sequelize.define(alias, cols, config)

   Product.associate = function(models) {

      Product.hasMany(models.ProductImgs, {
         as: 'Imgs',
         foreignKey: 'product_id'
      })

      Product.belongsToMany(models.Invoices, {
         as: 'Invoices',
         through: 'InvoiceProducts',
         foreignKey: 'product_id',
         otherKey: 'invoice_id'
      })

   }

   return Product

}