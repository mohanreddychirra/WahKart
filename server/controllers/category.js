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

  static addCategory(req, res) {  
    const { categoryName } = req.body; 

    if(
      typeof(categoryName) !== 'string' ||
      categoryName.trim() == '' ||
      !categoryName.match(/^[a-zA-Z ]+$/)
    ) {
      return res.status(400).json({
        message: 'Category name is not valid'
      });
    }

    Category.findOne({
      where: {
        name: categoryName
      }
    })
      .then(category => {
        if(category) {
          return res.status(400).json({
            message: 'Category already exists'
          });
        }

        Category.create({
          name: categoryName
        })
          .then(category => {
            res.status(201).json({
              message: 'Category added successfully',
              category
            });
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({
              message: 'Error occured while getting shop'
            });
          });

      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error occured while getting shop'
        });
      });
  }
}

export default CategoryCtrl;
