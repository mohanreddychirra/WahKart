'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('OrderItems', [
      {
        orderId: 1,
        productId: 1,
        price: '$5600',
        quantity: 5
      },
      {
        orderId: 1,
        productId: 2,
        price: '$5600',
        quantity: 5
      },
      {
        orderId: 2,
        productId: 3,
        price: '$5600',
        quantity: 5
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OrderItems', null, {});
  }
};
