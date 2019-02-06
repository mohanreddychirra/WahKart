'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.STRING
  }, {});
  OrderItem.associate = function(models) {
    OrderItem.hasOne(models.Product, {
      foreignKey: 'id',
      targetKey: 'productId'
    });

    OrderItem.belongsTo(models.Order, {
      as: 'orderItems',
      foreignKey: {
        name: 'orderId'
      }
    });
  };
  return OrderItem;
};
