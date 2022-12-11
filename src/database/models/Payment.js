module.exports = (sequelize, DataTypes) => {

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
      }
   }
   
   const config = {
      tableName: 'payment_methods',
      timestamps: true,
      paranoid: true
   }
   
   const Payment = sequelize.define(alias, cols, config)

   return Payment

}