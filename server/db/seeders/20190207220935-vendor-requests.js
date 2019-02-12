'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('VendorRequests', [
      {
        vendorId: 2,
        status: 'approved',
        shopName: 'Macys',
        createdAt: '2019-02-02',
        updatedAt: '2019-02-02'
      },
      {
        vendorId: 3,
        shopName: 'Nordstorm',
        status: 'open',
        createdAt: '2019-02-02',
        updatedAt: '2019-02-02'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('VendorRequests', null, {});
  }
};
