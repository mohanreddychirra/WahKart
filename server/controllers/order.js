import db from '../db/models';
const { Order, OrderItem } = db;

class OrderCtrl {
  static getOrders(req, res) {
    const { id } = req.payload;

    Order.findAll({
      where: {
        customerId: id
      },
      include: [{
        model: OrderItem
      }]
    })
      .then(orders => {
        if(!orders) {
          res.status(500).json({
            message: 'Error fetching orders'
          });
        } else {
          res.status(200).json({
            message: 'Orders fetched successfully',
            orders
          });
        }
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({
          message: 'internal server error'
        });
      });
  }
}

export default OrderCtrl;
