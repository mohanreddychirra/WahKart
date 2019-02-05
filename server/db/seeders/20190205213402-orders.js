'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders', [
      {
        trackingId: '3945T312F7',
        customerId: 4,
        createdAt: '01-01-2019'
      },
      {
        trackingId: 'FD34532435',
        createdAt: '01-07-2019',
        customerId: 4
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
