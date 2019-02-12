import db from '../db/models';

const { Product, Shop, Review, Auth, Order, OrderItem } = db;

class ProductCtrl {

  /**
   * 
   * @description
   * Controller method to get all products in the DB
   * 
   * @param { Object } req 
   * @param { Object } res 
   */
  static getAll(req, res) {
    Product.findAll()
      .then((products) => {
        res.status(200).json({
          message: 'Products fetched successfully',
          products
        });
      })
      .catch(() => {
        res.status(500).json({
          message: 'Error occured while fetching products',
        });
      });
  }

  /**
   * 
   * @description
   * A plain function to abstract common request body data validation
   * code for both add and edit product controller methods
   * 
   * @param { Object } res 
   * @param { Object } entry 
   * @param { String } password 
   * 
   * @returns { true | false }
   */
  static validateProduct(res, title, price, image, shopId) {
    if (!shopId || !`${shopId}`.match(/^[0-9]+$/)) {
      res.status(400).json({
        message: "Invalid shopId",
      });
  
      return false;
    }

    if (!title || title.trim().length === 0) {
      res.status(400).json({
        message: 'Title provided is invalid',
      });
      return false;
    }

    else if (!price || price.trim().length === 0 || !price.match(/\$[1-9][0-9]+$/)) {
      res.status(400).json({
        message: 'Price provided is invalid',
      });
      return false;
    }

    else if (!image || image.trim().length === 0) {
      res.status(400).json({
        message: 'Image provided is invalid',
      });
      return false;
    }

    else {
      return true;
    }
  }

  static vendorAccessShop(res, vendorId, shopId) {
    return Shop.findOne({
      where: { vendorId, id: shopId }
    })
      .then((shop) => {
        if (!shop) {
          res.status(403).json({
            message: 'Vendor has no access to shop',
          });
        } else {
          return true;
        }
      })
      .catch(() => {
        res.status(500).json({
          message: 'Error occured while getting vendor shop',
        });
      });
  }

  /**
   * 
   * @description
   * Controller method to add product to the Products DB table
   * This endpoint expect for product details (title, price and image)
   * to be passed as the request body accessible through req.body object
   * 
   * @param { Object } req 
   * @param { Object } res 
   */
  static addProduct(req, res) {
    let { id } = req.payload;
    let { title, price, image, shopId } = req.body;
    
    // runs the validation function and run the below code
    // if validation was successfull
    if (ProductCtrl.validateProduct(res, title, price, image, shopId)) {
      ProductCtrl.vendorAccessShop(res, id, shopId)
        .then((status) => {
          if (status !== true ) return;

          title = title.trim();
          price = price.trim();
          image = image.trim();

          // check if product already exist by checking the Products table
          // for entry with the provided title in a case insensitive manner. 
          Product.findOne({
            where: {
              shopId,
              title: {
                $ilike: title
              }
            }
          })
            .then((product) => {
              if(product) {
                res.status(409).json({
                  message: 'Product with this title already exist',
                });
              } else {
                Product.create({
                  title,
                  price,
                  image,
                  shopId
                })
                  .then((product) => {
                    res.status(201).json({
                      message: 'Product added successfully',
                      product
                    });
                  })
                  .catch(error => {
                    console.log(error);
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
        });
    }
  }

  /**
   * 
   * @description
   * Controller method to edit product in the Products DB table
   * This endpoint expect for product details (title, price and image)
   * to be passed as the request body accessible through req.body object
   * 
   * @param { Object } req 
   * @param { Object } res 
   */
  static editProduct(req, res) {
    let { id } = req.payload;
    let { title, price, image, shopId } = req.body;
    const { productId } = req.params;

    // runs the validation function and run the below code
    // if validation was successfull
    if (ProductCtrl.validateProduct(res, title, price, image, shopId)) {
      ProductCtrl.vendorAccessShop(res, id, shopId)
        .then((status) => {
          if (status !== true ) return;

          title = title.trim();
          price = price.trim();
          image = image.trim();

          // check if product actually exist before trying to update it
          Product.findOne({
            where: {
              id: productId,
              shopId
            }
          })
            .then((product) => {
              // if product is found, update the product details and save
              if(product) {
                product.title = title;
                product.price = price;
                product.image = image;
                product.save();

                res.status(200).json({
                  message: 'Product updated successfully',
                  product
                });
              } else {
                res.status(404).json({
                  message: 'Product does not exist',
                });
              }
            })
            .catch((error) => {
              res.status(500).json({
                message: 'Error occured while updating product',
                error
              });
            });
        })
    }
  }

  /**
   * 
   * @description
   * Controller method to delete a product from the Products DB table
   * This endpoint expect that the productId to be deleted should be passed
   * as params, that is via the request url and accessible here through the
   * req.params object.
   * 
   * @param { Object } req 
   * @param { Object } res 
   */
  static deleteProduct(req, res) {
    let { id } = req.payload;
    const { productId } = req.params;

    // confirm that the product actually exist in the Products table
    // before trying to delete it.
    Product.findOne({
      where: {
        id: productId
      }
    })
      .then((product) => {
        if (product) {
          ProductCtrl.vendorAccessShop(res, id, product.shopId)
            .then((status) => {
              if (status !== true ) return;
              product.destroy();

              res.status(200).json({
                message: 'Product deleted successfully',
                productId
              });
            })
        } else {
          res.status(404).json({
            message: 'Product does not exist'
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Error occured while deleting product',
          error
        });
      });
  }

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

  /**
   * 
   * @description
   * Controller method to fetch a particular product details from the
   * Products DB table, this endpoint expect that the productId to be
   * fetch should be passed as params, that is via the request url and
   * accessible here through the req.params object.
   * 
   * @param { Object } req 
   * @param { Object } res 
   */
  static getProduct(req, res) {
    const { productId } = req.params;
    const customerId = req.payload ? req.payload.id : null;

    Product.findOne({
      where: {
        id: productId,
      },
      include: [
        {
          model: Shop,
          attributes: [ 'name' ]
        },
        {
          model: Review,
          include: [{
            model: Auth,
            attributes: ['email']
          }
      ]
      }]
    })
      .then((product) => {
        if (product) {
          Review.findOne({
            where: {
              customerId,
              productId
            }
          })
            .then(review => {
              if (review) {
                return res.status(200).json({
                  message: 'Product fetched successfully',
                  product: { ...product.dataValues, canPostReview: false }
                });
              }

              ProductCtrl.checkIfPurchasedProduct(customerId, productId)
                .then(status => {
                  res.status(200).json({
                    message: 'Product fetched successfully',
                    product: { ...product.dataValues, canPostReview: status }
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    message: 'Error occured while getting product details'
                  });
                });
            })
            .catch(() => {
              res.status(500).json({
                message: 'Error occured while checking review'
              });
            });
        } else {
          res.status(404).json({
            message: 'Product does not exist'
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          message: 'Error occured while getting product details'
        });
      });
  }

 }

export default ProductCtrl;
