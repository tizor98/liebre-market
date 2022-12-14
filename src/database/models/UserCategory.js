module.exports = (sequelize, DataTypes) => {

   const alias = 'UserCategories'
   
   const cols = {
      id: {
         type: DataTypes.BIGINT,
         primaryKey: true,
         autoIncrement: true
      }
   }
   
   const config = {
      tableName: 'users_categories',
      timestamps: true,
      paranoid: true
   }
   
   const UserCategory = sequelize.define(alias, cols, config)

   return UserCategory

}