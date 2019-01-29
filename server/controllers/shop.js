import db from '../db/models';

const { Shop } = db;

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
}

export default ShopCtrl;
