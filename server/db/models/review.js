'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    customerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    rating: DataTypes.DOUBLE
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Auth, {
      foreignKey: 'customerId'
    })
  };
  return Review;
};