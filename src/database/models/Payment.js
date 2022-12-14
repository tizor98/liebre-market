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
      },
      allUsers: DataTypes.BOOLEAN
   }
   
   const config = {
      tableName: 'payment_methods',
      timestamps: true,
      paranoid: true
   }
   
   const Payment = sequelize.define(alias, cols, config)

   Payment.associate = function(models) {

      Payment.belongsToMany(models.Users, {
         as: 'Users',
         through: 'UserPayments',
         foreignKey: 'payment_id',
         otherKey: 'user_id'
      })

   }

   return Payment

}