module.exports = (sequelize, DataTypes) => {

   const alias = 'UsersCategories'
   
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
      category_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: "categories", // nombre de tabla en db
         referencesKey: "id" // nombre de col en db
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