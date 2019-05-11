'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      // Hoody Female
      {
        title: 'Female Hodiny',
        price: '$2500',
        shopId: 1,
        categoryId: 2,
        image: '/images/products/hood2.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Cover Up',
        price: '$3500',
        shopId: 1,
        categoryId: 2,
        image: '/images/products/hood3.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Stylish',
        price: '$1500',
        shopId: 2,
        categoryId: 2,
        image: '/images/products/hood4.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Female Over Head',
        price: '$500',
        shopId: 2,
        categoryId: 2,
        image: '/images/products/hood5.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },

      // Hoody Male
      {
        title: 'Hodiny',
        price: '$2500',
        shopId: 1,
        categoryId: 1,
        image: '/images/products/hood1.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Cover Up',
        price: '$3500',
        shopId: 1,
        categoryId: 1,
        image: '/images/products/hood6.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Stylish',
        price: '$1500',
        shopId: 2,
        categoryId: 1,
        image: '/images/products/hood7.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Male Over Head',
        price: '$500',
        shopId: 2,
        categoryId: 1,
        image: '/images/products/hood8.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },

      // T-Shirt Male
      {
        title: 'Hanes',
        price: '$2500',
        shopId: 1,
        categoryId: 1,
        image: '/images/products/tshirt1.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Gildan',
        price: '$3500',
        shopId: 1,
        categoryId: 1,
        image: '/images/products/tshirt2.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Fruit of the Loom',
        price: '$1500',
        shopId: 2,
        categoryId: 1,
        image: '/images/products/tshirt3.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Men\'s Dual',
        price: '$500',
        shopId: 2,
        categoryId: 1,
        image: '/images/products/tshirt7.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      // T-Shirt Female
      {
        title: 'Hanes Female',
        price: '$2500',
        shopId: 1,
        categoryId: 2,
        image: '/images/products/tshirt4.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Gildan',
        price: '$3500',
        shopId: 1,
        categoryId: 2,
        image: '/images/products/tshirt5.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Fruit of the Loom',
        price: '$1500',
        shopId: 2,
        categoryId: 2,
        image: '/images/products/tshirt6.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      },
      {
        title: 'Female\'s Dual',
        price: '$500',
        shopId: 2,
        categoryId: 2,
        image: '/images/products/tshirt8.jpg',
        createdAt: '2018-10-17 23:56:04.001+01',
        updatedAt: '2018-10-17 23:56:04.001+01'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
