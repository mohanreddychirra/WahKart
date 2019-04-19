'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Men Clothings',
        shopId: 1
      },
      {
        name: 'Women Clothings',
        shopId: 1
      },
      {
        name: 'Kids Clothings',
        shopId: 2
      },
      {
        name: 'Electronics',
        shopId: 2
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
