import db from '../db/models';

const { Product } = db;

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
        res.json(200, {
          message: 'Products fetched successfully',
          products
        });
      })
      .catch(() => {
        res.json(500, {
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
  static validateProduct(res, title, price, image) {
    if (!title || title.trim().length === 0) {
      res.status(400).json({
        message: 'Title provided is invalid',
      });
      return false;
    }

    else if (!price || price.trim().length === 0) {
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
    let { title, price, image } = req.body;
    
    // runs the validation function and run the below code
    // if validation was successfull
    if (ProductCtrl.validateProduct(res, title, price, image)) {
      title = title.trim();
      price = price.trim();
      image = image.trim();

      // check if product already exist by checking the Products table
      // for entry with the provided title in a case insensitive manner. 
      Product.findOne({
        where: {
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
              image
            })
              .then((product) => {
                res.status(201).json({
                  message: 'Product added successfully',
                  product
                });
              })
              .catch(error => {
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
    let { title, price, image } = req.body;
    const { productId } = req.params;

    // runs the validation function and run the below code
    // if validation was successfull
    if (ProductCtrl.validateProduct(res, title, price, image)) {
      title = title.trim();
      price = price.trim();
      image = image.trim();

      // check if product actually exist before trying to update it
      Product.findOne({
        where: {
          id: productId
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
            message: 'Internal server error',
            error
          });
        });
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
          product.destroy();

          res.status(200).json({
            message: 'Product deleted successfully',
            productId
          });
        } else {
          res.status(404).json({
            message: 'Product does not exist'
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

    Product.findOne({
      where: {
        id: productId
      }
    })
      .then((product) => {
        if (product) {
          res.status(200).json({
            message: 'Product fetched successfully',
            product
          });
        } else {
          res.status(404).json({
            message: 'Product does not exist'
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

export default ProductCtrl;
