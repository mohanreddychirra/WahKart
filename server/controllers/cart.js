import db from '../db/models';

const { Cart } = db;

class CartCtrl {
  static getCartItems(req, res) {
    const { id } = req.payload;
    Cart.findAll({
      where: {
        customerId: id
      }
    })
      .then((cart) => {
        res.status(200).json({
          message: 'Carts items fetched successfully',
          cart
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Internal server error',
          error
        });
      });
  }

  static deleteCartItem(req, res) {
    const { id } = req.payload;
    const { productId } = req.body;

    Cart.findOne({
      where: {
        productId,
        customerId: id
      }
    })
      .then((cartItem) => {
        if(cartItem) {
          cartItem.destroy();
          res.status(200).json({
            message: 'Cart item deleted successfully',
          });
        }
        else{
          res.status(404).json({
            message: 'Cart item does not exist',
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Internal server error',
          error
        });
      });
  }

  static addCartItem(req, res) {
    const { id } = req.payload;
    const { productId } = req.body;

    Cart.findOne({
      where: {
        productId,
        customerId: id
      }
    })
      .then((cartItem) => {
        if(cartItem) {
          res.status(409).json({
            message: 'Cart item already exists for customer',
          });
        } else {
          Cart.create({
            productId,
            customerId: id
          })
            .then((cartItem) => {
              res.status(201).json({
                message: 'Cart item created successfully',
                cartItem
              });
            })
            .catch((error) => {
              res.status(500).json({
                message: 'Internal server error',
                error
              });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Internal server error',
          error
        });
      });
  }
}

export default CartCtrl;
