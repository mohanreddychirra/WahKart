'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Auths', [
      {
        email: 'vendor1@gmail.com',
        role: 'vendor',
        password: '$2b$08$aCpuR6JmocP4Wmh2v85zKuvQV.oVp9iyp.8gx4sjytxgt7mRz1Hq2',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        email: 'vendor2@gmail.com',
        role: 'vendor',
        password: '$2b$08$aCpuR6JmocP4Wmh2v85zKuvQV.oVp9iyp.8gx4sjytxgt7mRz1Hq2',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        email: 'admin@gmail.com',
        role: 'admin',
        password: '$2b$08$aCpuR6JmocP4Wmh2v85zKuvQV.oVp9iyp.8gx4sjytxgt7mRz1Hq2',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Auths', null, {});
  }
};
