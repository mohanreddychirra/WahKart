'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Vendors', [
      {
        id: 1,
        email: 'vendor@gmail.com',
        password: '$2b$08$aCpuR6JmocP4Wmh2v85zKuvQV.oVp9iyp.8gx4sjytxgt7mRz1Hq2',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Vendors', null, {});
  }
};
