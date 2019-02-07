'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('VendorRequests', [
      {
        vendorId: 1,
        status: 'approved',
        createdAt: '2019-02-02',
        updatedAt: '2019-02-02'
      },
      {
        vendorId: 2,
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
