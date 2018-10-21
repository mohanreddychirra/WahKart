import db from '../db/models';

const { Product } = db;

class ProductCtrl {
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

  static addProduct(req, res) {
    let { title, price, image } = req.body;
    
    if (ProductCtrl.validateProduct(res, title, price, image)) {
      title = title.trim();
      price = price.trim();
      image = image.trim();

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

  static editProduct(req, res) {
    let { title, price, image } = req.body;
    const { productId } = req.params;

    if (ProductCtrl.validateProduct(res, title, price, image)) {
      title = title.trim();
      price = price.trim();
      image = image.trim();

      Product.findOne({
        where: {
          id: productId
        }
      })
        .then((product) => {
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

  static deleteProduct(req, res) {
    const { productId } = req.params;

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
