export function model (sequelize, DataTypes) {

   const alias = 'Payments'
   
   const cols = {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      type: {
         type: DataTypes.STRING(2),
         allowNull: false
      },
      number: {
         type: DataTypes.BIGINT,
         allowNull: false
      },
      expiration: {
         type: DataTypes.STRING,
         allowNull: false
      },
      cvv: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      user_id: {
         type: DataTypes.BIGINT,
         allowNull: false
      }
   }
   
   const config = {
      tableName: 'payment_methods',
      timestamps: true,
      paranoid: true
   }
   
   const Payment = sequelize.define(alias, cols, config)

   Payment.associate = function(models) {

      Payment.belongsTo(models.Users, {
         as: 'Users',
         foreignKey: 'user_id'
      })

   }

   return Payment

}