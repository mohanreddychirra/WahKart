'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Shops', [
      {
        vendorId: 1,
        name: 'Vendor-1 Shop',
        location: 'Chicago US'
      },
      {
        vendorId: 2,
        name: 'Vendor-2 Shop',
        email: 'v2shop@gmmail.com'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shops', null, {});
  }
};
