import db from '../db/models';

const { Order, OrderItem } = db;

class Helper {
  /**
   * 
   * @description To check if customer has purchased product before
   * 
   * @param {*} customerId 
   * @param {*} productId 
   */
  static checkIfPurchasedProduct(customerId, productId) {
    // Fetch all orders for a customer
    return Order.findAll({
      where: {
        customerId
      }
    })
      .then(orders => {
        if (!orders) return false;

        const orderIds = orders.map(order => order.id);

        return OrderItem.findOne({
          where: {
            orderId: orderIds,
            productId
          }
        })
          .then((orderItem) => !!orderItem)
          .catch(() => false);
      })
      .catch(() => false);
  }
}

export default Helper;
