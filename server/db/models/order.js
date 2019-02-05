'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    trackingId: DataTypes.STRING,
    customerId: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderId'
    });
  };
  return Order;
};