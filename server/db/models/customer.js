'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  
  return Customer;
};