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
    })
  }

  return Product;
};