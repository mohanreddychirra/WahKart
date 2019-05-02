import db from '../db/models';

const { Review, Auth } = db;

class ReviewCtrl {
  static checkReviewData(review, rating) {
    if (!review || typeof review !== 'string' || !review.trim().length) {
      return { message: "Review text is invalid" };
    }
    
    else if (!rating || !parseFloat(rating)) {
      return { message: "Rating value is invalid" };
    }

    return true;
  }

  static getReviewOwner(id) {
    return Auth.findOne({
      where: {
        id,
        role: 'customer'
      },
      attributes: [ 'email' ]
    })
      .then((auth) => {
        if (!auth) return false;
        return auth;
      })
      .catch(() => false)
  }

  static postReview(req, res) {
    const { id } = req.payload;
    const { review, rating } = req.body;
    const { productId } = req.params;

    const response = ReviewCtrl.checkReviewData(review, rating);
    if (response !== true) {
      return res.status(400).json(response);
    }

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
            if(newRecord) {
              ReviewCtrl.getReviewOwner(id)
                .then((auth) => {
                  if(!auth) {
                    return res.status(500).json({
                      message: "Could not locate customer"
                    });
                  }

                  return res.status(200).json({
                    message: "Review posted successfully",
                    review: {
                      ...newRecord.dataValues,
                      Auth: { email: auth.email }
                    }
                });
              });
            }

            else {
              res.status(500).json({
                message: "Review was not created"
              })
            }
          })
          .catch(() => {
            res.status(500).json({
              message: "Error occured while posting review"
            })
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error occured while checking for review"
        })
      });
  }

  static updateReview(req, res) {
    const { id } = req.payload;
    const { review, rating } = req.body;
    const { productId } = req.params;

    const response = ReviewCtrl.checkReviewData(review, rating);
    if (response !== true) {
      return res.status(400).json(response);
    }

    Review.findOne({
      where: {
        customerId: id,
        productId
      }
    })
      .then(record => {
        if (!record) {
          return res.status(404).json({
            message: "Review does not exist"
          })
        }

        ReviewCtrl.getReviewOwner(id)
          .then((auth) => {
            if(!auth) {
              res.status(500).json({
                message: "Could not locate customer"
              });
            }

            record.review = review.trim();
            record.rating = parseFloat(rating);
            record.save();

            res.status(200).json({
              message: "Review updated successfully",
              review: {
                ...record.dataValues,
                Auth: { email: auth.email }
              },
            })
          })
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error occured while fetching review"
        })
      });
  }

  static deleteReview(req, res) {
    const { id } = req.payload;
    const { id: reviewId } = req.params;

    Review.findOne({
      where: {
        id: reviewId,
        customerId: id
      }
    })
      .then(record => {
        if(!record) {
          return res.status(404).json({
            message: "Review does not exist"
          });
        }

        record.destroy();
        return res.status(200).json({
          message: "Review deleted successfully",
          reviewId: record.id
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error occured while getting review"
        })
      });
  }
}

export default ReviewCtrl;

