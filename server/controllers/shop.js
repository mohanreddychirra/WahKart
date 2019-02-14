import db from '../db/models';

const { Shop, Product } = db;

class ShopCtrl {
  /**
   * 
   * @description Get all available shops
   * 
   * @param {*} req
   * @param {*} res
   * 
   * @memberof ShopCtrl
   */
  static getAll(req, res) {
    Shop.findAll()
      .then((shops) => {
        res.status(200).json({
          message: "All shops fetched successfully",
          shops
        });
      })
      .catch(() => {
        res.status(500).json({
          message: "Internal Server Error"
        });
      });
  }

  /**
   * 
   * @description Get all products in a single shop
   * @param {*} req 
   * @param {*} res 
   */
  static getProducts(req, res) {
    const { shopId } = req.params;

    Product.findAll({
      where: { shopId }
    })
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
   * @description Create a single shop for vendor
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static createShop(req, res) {
    res.status(200).json({
      message: "Endpoint to create a shop"
    });
  }
}

export default ShopCtrl;
