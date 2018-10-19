'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  Vendor.associate = function(models) {
    // associations can be defined here
  };
  return Vendor;
};