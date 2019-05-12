'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    productId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER
  }, {});
  Cart.associate = function(models) {
    Cart.belongsTo(models.Product, {
      foreignKey: 'productId',
      targetKey: 'id'
    })
  };
  return Cart;
};