'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    shopId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});

  Product.associate = function(models) {
    Product.hasMany(models.Review, {
      foreignKey: 'productId'
    });

    Product.belongsTo(models.Shop, {
      foreignKey: 'shopId'
    })

    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    })
  }

  return Product;
};