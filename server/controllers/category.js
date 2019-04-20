import db from '../db/models';
import { capitalize } from '../utils';

const { Category, Product } = db;

class CategoryCtrl {
  static validateCategoryName(categoryName) {
    return new Promise((resolve, reject) => {
      if(
        typeof(categoryName) !== 'string' ||
        categoryName.trim() == '' ||
        !categoryName.match(/^[a-zA-Z ]+$/)
      ) {
        return resolve('Category name is not valid');
      }

      Category.findOne({
        where: {
          name: categoryName
        }
      })
        .then(category => {
          if(category) {
            return resolve('Category already exists');
          }

          return resolve(true);
        })
        .catch(error => reject(error));
    });
  }

  static getAll(req, res) {
    Category.findAll({})
      .then(categories => {
        if(!categories) categories = [];

        return res.status(200).json({
          message: 'Categories fetched successfully',
          Categories: categories
        });
      })
      .catch(() => {
        res.status(500).json({
          message: 'Error occured while getting shop'
        });
      });
  }

  static addCategory(req, res) {  
    let { categoryName } = req.body; 
    categoryName = capitalize(categoryName);

    CategoryCtrl.validateCategoryName(categoryName)
      .then((error) => {
        if(error !== true) {
          return res.status(400).json({
            message: error
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
          .catch(() => {
            res.status(500).json({
              message: 'Error occured while getting shop'
            });
          });
      })
      .catch(() => {
        res.status(500).json({
          message: 'Internal server error'
        });
      });
  }

  static deleteCategory(req, res) {
    const { categoryId } = req.params;

    Category.findOne({
      where: {
        id: categoryId
      }
    })
      .then(category => {
        if(!category) {
          return res.status(404).json({
            message: 'Category does not exist'
          });
        }

        category.destroy();

        return res.status(200).json({
          message: 'Category deleted successfully'
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Error occured while getting category'
        });
      });;
  }

  static updateCategory(req, res) {
    const { categoryId } = req.params;
    let { categoryName } = req.body;
    categoryName = capitalize(categoryName);

    Category.findOne({
      where: {
        id: categoryId
      }
    })
      .then(category => {
        if(!category) {
          return res.status(404).json({
            message: 'Category does not exist'
          });
        }

        CategoryCtrl.validateCategoryName(categoryName)
          .then(error => {
            if(error !== true) {
              return res.status(400).json({
                message: error
              }); 
            }

            category.name = categoryName;
            category.save();
    
            return res.status(200).json({
              message: 'Category updated successfully'
            });
          })
          .catch(error => {
            res.status(500).json({
              message: 'Error occured while updating category'
            });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Error occured while getting category'
        });
      });;
  }

  static addProduct(req, res) {
    const { categoryId, productId } = req.params;

    Product.findOne({
      where: {
        id: productId
      }
    })
      .then(product => {
        if(!product) {
          return res.status(404).json({
            message: 'Product was not found'
          });
        }

        Category.findOne({
          where: {
            id: categoryId
          }
        })
          .then(category => {
            if(!category) {
              return res.status(404).json({
                message: 'Category was not found'
              });
            }

            // category and product exist
            product.categoryId = categoryId;
            product.save();

            return res.status(200).json({
              message: 'Product added to category'
            });
          })
          .catch(error => {
            res.status(500).json({
              message: 'Error occured while getting product'
            });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Error occured while getting product'
        });
      });
  }
}

export default CategoryCtrl;
