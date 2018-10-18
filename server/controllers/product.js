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
}

export default ProductCtrl;
