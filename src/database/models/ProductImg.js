export function model (sequelize, DataTypes) {

   const alias = 'ProductImgs'
   
   const cols = {
      id: {
         type: DataTypes.BIGINT,
         primaryKey: true,
         autoIncrement: true
      },
      product_id: {
         type: DataTypes.BIGINT,
         allowNull: false,
      },
      img: {
         type: DataTypes.STRING(90),
         allowNull: false
      },
      main_img: {
         type: DataTypes.BOOLEAN,
         default: null
      }
   }
   
   const config = {
      tableName: 'product_img',
      timestamps: true,
      paranoid: true
   }
   
   const ProductImg = sequelize.define(alias, cols, config)

   ProductImg.associate = function(models) {

      ProductImg.belongsTo(models.Products, {
         as: 'Products',
         foreignKey: 'product_id'
      })

   }

   return ProductImg

}