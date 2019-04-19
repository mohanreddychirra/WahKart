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
  };
  return Shop;
};