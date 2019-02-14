import db from '../db/models';
const { Order, OrderItem, Product } = db;
const alphas = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

class OrderCtrl {
  /**
   * 
   * @description Fetch all orders that belongs to a customer
   * @param {*} id 
   */
  static fetchOrdersForCustomers(id) {
    return Order.findAll({
      where: {
        customerId: id
      },
      include: [{
        model: OrderItem,
        include: [
          {
            model: Product
          }
        ]
      }]
    })
      .catch((e) => {
        res.status(500).json({
          message: 'internal server error'
        });
      });
  }

  /**
   * 
   * @description To get all order items associated with ann order
   * 
   * @param {*} id 
   */
  static fetchOrdertemsIForAnOrder(id) {
    return OrderItem.findAll({
      where: {
        orderId: id
      },
      include: [
        {
          model: Product
        }
      ]
    })
      .catch((e) => {
        res.status(500).json({
          message: 'internal server error'
        });
      });
  }

  /**
   * 
   * 
   * @description Get all the orders for a customer
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static getOrders(req, res) {
    const { id } = req.payload;

    OrderCtrl.fetchOrdersForCustomers(id)
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
      });
  }

  /**
   * 
   * @description Place an order
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static addOrder(req, res) {
    const { id } = req.payload;
    const { order: { amount, products } } = req.body;
    const trackingId = OrderCtrl.generateTrackingId();

    Order.create({
      trackingId,
      customerId: id,
      amount
    })
      .then((order) => {
        const newdata = products.map((product) => {
          return {
            ...product,
            orderId: order.id
          }
        });

        // Insert order items if order has been inserted successfully
        OrderItem.bulkCreate(newdata)
          .then(() => {
            OrderCtrl.fetchOrdertemsIForAnOrder(order.id)
              .then((OrderItems) => {
                res.status(201).json({
                  message: 'Order created successfully',
                  order: {
                    id: order.id,
                    trackingId:order.trackingId,
                    customerId: order.customerId,
                    amount: order.amount,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt,
                    OrderItems
                  }
                });
              })
          })
          .catch((e) => {
            res.status(500).json({
              message: 'internal server error'
            });
          });
      })
      .catch((e) => {
        res.status(500).json({
          message: 'internal server error'
        });
      });
  }

  /**
   * 
   * @description This is to generate a unique ID for each order
   */
  static generateTrackingId() {
    let trackingId = '';
    let i;
  
    for(i=0; i<10; i++) {
      const rand = Math.floor(Math.random() * 7);
      if (i%2 === 0) {
        trackingId += `${rand}`;
      } else {
        trackingId += `${alphas[rand]}`;
      }
    }

    return trackingId;
  }
}

export default OrderCtrl;
