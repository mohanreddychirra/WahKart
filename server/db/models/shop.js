'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    name: DataTypes.STRING,
    vendorId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Shop.associate = function(models) {
    Shop.hasMany(models.Product, {
      foreignKey: 'shopId'
    });

    Shop.hasMany(models.Category, {
      foreignKey: 'shopId'
    });
  };
  return Shop;
};