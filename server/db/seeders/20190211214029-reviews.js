'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        customerId: 1,
        productId: 1,
        review: 'This is a review from customer 1',
        rating: 3
      },
      {
        customerId: 1,
        productId: 1,
        review: 'This is another review from user',
        rating: 4
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
