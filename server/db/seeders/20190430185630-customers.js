'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', [
      {
        authId: 2,
        firstName: 'John',
        lastName: 'Doe',
        address: 'Chicago US',
        createdAt: '2019-02-02',
        updatedAt: '2019-02-02'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
