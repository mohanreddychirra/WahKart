import db from '../db/models';

const { Cart, Product } = db;

class CartCtrl {
  /**
   * 
   * @description Cart controller method to get all customers cart items
   * 
   * @param { Object } req 
   * @param { Object } res 
   */
  static getCartItems(req, res) {
    const { id } = req.payload;

    // get all cart item for the specified customer ID
    Cart.findAll({
      where: {
        customerId: id,
      },
      include: [{
        model: Product
      }]
    })
      .then((cart) => {
        res.status(200).json({
          message: 'Carts items fetched successfully',
          cart
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Error occured while getting cart items',
        });
      });
  }

  /**
   * 
   * @description Cart controller method to delete a specific
   * product from cart for a particular customer.
   * 
   * it is neccessary to first check if the product exist in Carts table
   * 
   * @param { Object } req 
   * @param { Object } res 
   */
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

  /**
   * 
   * @description delete all cart items for a customer
   *  
   * @param {*} req 
   * @param {*} res 
   */
  static clearCartItems(req, res) {
    const { id } = req.payload;

    Cart.destroy({
      where: {
        customerId: id
      }
    })
      .then(() => {
        res.status(200).json({
          message: 'Cart item cleared successfully',
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Internal server error',
          error
        });
      });
  }

  /**
   * 
   * @description Cart controller method to add a
   * product to cart for a particular customer.
   * 
   * it is neccessary to first check that the product
   * does not already exist in the cart
   * 
   * @param { Object } req 
   * @param { Object } res 
   */
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
              cartItem.getProduct().then(product => {
                if(!product) {
                  return res.status(500).json({
                    message: 'Product for cart item was not found',
                  });
                }

                cartItem = { ...cartItem.dataValues, Product: product }
                
                res.status(201).json({
                  message: 'Cart item created successfully',
                  cartItem
                });
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
