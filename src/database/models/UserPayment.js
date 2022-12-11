module.exports = (sequelize, DataTypes) => {

   const alias = 'UserPayments'
   
   const cols = {
      id: {
         type: DataTypes.BIGINT,
         primaryKey: true,
         autoIncrement: true
      },
      user_id: {
         type: DataTypes.BIGINT,
         allowNull: false,
         references: "users", // nombre de tabla en db
         referencesKey: "id" // nombre de col en db
      },
      payment_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: "payment_methods", // nombre de tabla en db
         referencesKey: "id" // nombre de col en db
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