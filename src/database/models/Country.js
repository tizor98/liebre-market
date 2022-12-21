export function model(sequelize, DataTypes) {

   const alias = 'Countries'
   
   const cols = {
      id: {
         type: DataTypes.SMALLINT,
         primaryKey: true,
         autoIncrement: true
      },
      name: {
         type: DataTypes.STRING(45),
         allowNull: false
      }
   }
   
   const config = {
      tableName: 'countries',
      timestamps: true,
      paranoid: true
   }
   
   const Country = sequelize.define(alias, cols, config)
   
   Country.associate = function(models) {
      
      Country.hasMany(models.Users, {
         as: 'users',
         foreignKey: 'country_id'
      })
   
   }

   return Country

}