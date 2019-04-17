'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Shops', [
      {
        vendorId: 3,
        name: 'Macys',
        location: 'Chicago US'
      },
      {
        vendorId: 4,
        name: 'Nordstorm',
        location: 'Chicago US'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shops', null, {});
  }
};
