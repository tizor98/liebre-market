module.exports = (sequelize, DataTypes) => {

   const alias = 'UserPayments'
   
   const cols = {
      id: {
         type: DataTypes.BIGINT,
         primaryKey: true,
         autoIncrement: true
      }
   }
   
   const config = {
      tableName: 'users_payments',
      timestamps: true,
      paranoid: true
   }
   
   const UserCategory = sequelize.define(alias, cols, config)

   return UserCategory

}