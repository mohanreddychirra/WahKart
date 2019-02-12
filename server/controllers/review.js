import db from '../db/models';
import Helper from './helper';

const { Review, Auth } = db;

class ReviewCtrl {
  static postReview(req, res) {
    const { id } = req.payload;
    const { review, rating } = req.body;
    const { productId } = req.params;

    Helper.checkIfPurchasedProduct(id, productId)
      .then((status) => {
        if (!status) {
          res.status(403).json({
            message: "Access denied for posting review for product"
          })
        } else if (!review || typeof review !== 'string' || review.trim().length === 0) {
          res.status(400).json({
            message: "Review text is invalid"
          })
        } else if (!rating || !parseFloat(rating)) {
          res.status(400).json({
            message: "Rating value is invalid"
          })
        } else {
          Review.findOne({
            where: {
              customerId: id,
              productId
            }
          })
            .then(record => {
              if (record) {
                return res.status(409).json({
                  message: "Review already exist"
                })
              }

              Review.create({
                customerId: id,
                productId,
                review: review.trim(),
                rating: parseFloat(rating)
              })
                .then((newRecord) => {
                  Auth.findOne({
                    where: {
                      id,
                      role: 'customer'
                    },
                    attributes: [ 'email' ]
                  })
                    .then((auth) => {
                      if (!auth) {
                        return res.status(500).json({
                          message: "Could not locate customer"
                        })
                      }

                      res.status(200).json({
                        message: "Review posted successfully",
                        review: {
                          ...newRecord.dataValues,
                          Auth: { email: auth.email }
                        }
                      });
                    })
                    .catch(() => {
                      res.status(500).json({
                        message: "Error occured while locating customer"
                      })
                    });
                })
                .catch(() => {
                  res.status(500).json({
                    message: "Error occured while posting review"
                  })
                });
            })
            .catch(() => {
              res.status(500).json({
                message: "Error occured while checking for review"
              })
            });
        }
      })
      .catch(() => {})
  }
}

export default ReviewCtrl;
