export function model (sequelize, DataTypes) {

   const alias = 'InvoiceProducts'

   const cols = {
      id: {
         type: DataTypes.BIGINT,
         primaryKey: true,
         autoIncrement: true
      },
      quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      selling_price: {
         type: DataTypes.FLOAT,
         allowNull: false,
      },
   }

   const config = {
      tableName: 'invoices_products',
      timestamps: true,
      paranoid: true
   }

   const InvoiceProduct = sequelize.define(alias, cols, config)

   return InvoiceProduct

}