'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        title: 'Product 1',
        price: '$2500',
        shopId: 1,
        image: '/images/products/1.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Product 2',
        price: '$3500',
        shopId: 1,
        image: '/images/products/2.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Product 3',
        price: '$1500',
        shopId: 2,
        image: '/images/products/3.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Product 4',
        price: '$500',
        shopId: 2,
        image: '/images/products/4.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
