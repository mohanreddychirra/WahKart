'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Men Clothings'
      },
      {
        name: 'Women Clothings'
      },
      {
        name: 'Kids Clothings'
      },
      {
        name: 'Electronics'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
