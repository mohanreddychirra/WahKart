import db from '../db/models';
const { Order, OrderItem, Product } = db;
const alphas = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

class OrderCtrl {
  static getOrders(req, res) {
    const { id } = req.payload;

    Order.findAll({
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

  static addOrder(req, res) {
    const { id } = req.payload;
    const { products } = req.body;
    const trackingId = OrderCtrl.generateTrackingId();

    Order.create({
      trackingId,
      customerId: id
    })
      .then((order) => {
        const newdata = products.map((product) => {
          return {
            ...product,
            orderId: order.id
          }
        });

        OrderItem.bulkCreate(newdata)
          .then(() => {
            res.status(201).json({
              message: 'Order created successfully'
            });
          })
          .catch(() => {
            res.status(500).json({
              message: 'internal server error'
            });
          });
      })
      .catch(() => {
        res.status(500).json({
          message: 'internal server error'
        });
      });
  }

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
