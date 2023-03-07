export function model (sequelize, DataTypes) {

   const alias = 'Users'

   const cols = {
      id: {
         type: DataTypes.BIGINT,
         primaryKey: true,
         autoIncrement: true
      },
      email: {
         type: DataTypes.STRING(90),
         unique: true,
         allowNull: false
      },
      name: {
         type: DataTypes.STRING(45),
         allowNull: false
      },
      surname: {
         type: DataTypes.STRING(45),
         allowNull: false
      },
      dni: {
         type: DataTypes.STRING(56),
         allowNull: false
      },
      password: {
         type: DataTypes.TEXT,
         allowNull: false
      },
      address: {
         type: DataTypes.STRING(45),
      },
      birthday: {
         type: DataTypes.DATE
      },
      country_id: {
         type: DataTypes.SMALLINT,
         references: "countries", // nombre de tabla en db
         referencesKey: "id" // nombre de col en db
      },
      img_profile: {
         type: DataTypes.STRING(90)
      }
   }

   const config = {
      tableName: 'users',
      timestamps: true,
      paranoid: true
   }

   const User = sequelize.define(alias, cols, config)

   User.associate = function(models) {
      
      User.belongsTo(models.Countries, {
         as: 'Countries',
         foreignKey: 'country_id'
      })

      User.belongsToMany(models.Categories, {
         as: 'Categories',
         through: 'UserCategories',
         foreignKey: 'user_id',
         otherKey: 'category_id'
      })

      User.hasMany(models.Payments, {
         as: 'Payments',
         foreignKey: 'user_id'
      })

      User.hasMany(models.Invoices, {
         as: 'Invoices',
         foreignKey: 'buyer_id'
      })
   
   }

   return User

}