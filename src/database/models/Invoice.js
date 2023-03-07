export function model (sequelize, DataTypes) {

   const alias = 'Invoices'

   const cols = {
      id: {
         type: DataTypes.BIGINT,
         primaryKey: true,
         autoIncrement: true
      },
      buyer_id: DataTypes.BIGINT,
      buyer_email: DataTypes.STRING(96),
      buyer_full_name: DataTypes.STRING(96),
      buyer_dni: DataTypes.STRING(56),
      buyer_address: DataTypes.STRING(56),
      card_type: DataTypes.STRING(2),
      card_number: DataTypes.BIGINT,
      card_exp: DataTypes.STRING(8),
      card_cvv: DataTypes.STRING(8),
      total: DataTypes.FLOAT,
   }

   const config = {
      tableName: 'invoices',
      timestamps: true,
      paranoid: true
   }

   const Invoice = sequelize.define(alias, cols, config)

   Invoice.associate = function(models) {

      Invoice.belongsToMany(models.Products, {
         as: 'Products',
         through: 'InvoiceProducts',
         foreignKey: 'invoice_id',
         otherKey: 'product_id'
      })

      Invoice.belongsTo(models.Users, {
         as: 'Buyers',
         foreignKey: 'buyer_id'
      })

   }

   return Invoice

}