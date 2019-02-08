'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Shops', [
      {
        vendorId: 1,
        name: 'Macys',
        location: 'Chicago US'
      },
      {
        vendorId: 2,
        name: 'Nordstorm',
        email: 'v2shop@gmmail.com'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shops', null, {});
  }
};
