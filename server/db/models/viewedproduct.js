'use strict';
module.exports = (sequelize, DataTypes) => {
  const ViewedProduct = sequelize.define('ViewedProduct', {
    customerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {});
  ViewedProduct.associate = function(models) {
    ViewedProduct.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
  };
  return ViewedProduct;
};