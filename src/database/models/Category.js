module.exports = (sequelize, DataTypes) => {

   const alias = 'Categories'
   
   const cols = {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      name: {
         type: DataTypes.STRING(90),
         allowNull: false
      }
   }
   
   const config = {
      tableName: 'categories',
      timestamps: true,
      paranoid: true
   }
   
   const Category = sequelize.define(alias, cols, config)

   return Category

}