import db from '../db/models';

const { Category, Shop} = db;

class CategoryCtrl {
  static getAll(req, res) {
    const { shopId } = req.params;

    Shop.findOne({
      where: { id: shopId },
      include: [{ model: Category }]
    })
      .then(shop => {
        if(!shop) {
          return res.status(404).json({
            message: 'Shop does not exist'
          });
        } else {
          return res.status(200).json({
            message: 'Categories fetched successfully',
            Categories: shop.Categories
          });
        }
        
      })
      .catch(() => {
        res.status(500).json({
          message: 'Error occured while getting shop'
        });
      });
  }
}

export default CategoryCtrl;
