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

   Category.associate = function(models) {

      Category.belongsToMany(models.Users, {
         as: 'users',
         through: 'users_categories',
         foreignKey: 'category_id',
         otherKey: 'user_id'
      })

   }

   return Category

}