'use strict';
module.exports = (sequelize, DataTypes) => {
  const VendorRequest = sequelize.define('VendorRequest', {
    vendorId: DataTypes.INTEGER,
    shopName: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  
  VendorRequest.associate = function(models) {
    VendorRequest.belongsTo(models.Auth, {
      foreignKey: 'vendorId',
      targetKey: 'id'
    });
  };

  return VendorRequest;
};