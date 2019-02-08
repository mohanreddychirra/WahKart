'use strict';
module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define('Auth', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  Auth.associate = function(models) {
    Auth.hasOne(models.Shop, {
      foreignKey: 'vendorId',
      targetKey: 'id'
    });

    Auth.hasOne(models.VendorRequest, {
      foreignKey: 'vendorId',
      targetKey: 'id'
    });
  };
  return Auth;
};

