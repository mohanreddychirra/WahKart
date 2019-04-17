import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import history from '../../history'; 
import { postReview } from '../../actions/reviewAction';
import toastr from 'toastr';

class Product extends Component {
  constructor(props) {
    super(props);
    this.renderActionStars = this.renderActionStars.bind(this);
    this.renderViewStars = this.renderViewStars.bind(this);
    this.clickStar = this.clickStar.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
    this.handlePostReview = this.handlePostReview.bind(this);
    this.reviewChange = this.reviewChange.bind(this);
    this.calculateAverageRating = this.calculateAverageRating.bind(this);

    this.state = {
      starCount: 0,
      review: '',
      error: null
    }
  }

  calculateAverageRating(reviews) {
    const sum = reviews.reduce((aggregate, review) => {
      const { rating } = review;
      return aggregate + (parseFloat(rating) || 0);
    }, 0);

    return (!reviews ? 0 : (sum / reviews.length)).toFixed(1);
  }

  reviewChange(event) {
    const { target: { value } } = event;
    this.setState({ review: value });
  }

  handlePostReview() {
    const { starCount, review } = this.state;
    const { match: { params: { productId } }} = this.props;
    this.props.postReview(productId, review, starCount)
      .then((message) => {
        if (message !== true) {
          toastr.error(message);
        }
      }).catch(() => {})
  }

  componentWillMount() {
    const { match: { params: { productId } }} = this.props;
    this.props.getProduct(productId);
  }

  componentWillReceiveProps(nextProps) {
    const { product } = nextProps;

    if (product === false) {
      history.push('/');
      return
    }
  }

  clickStar(value) {
    this.setState({ starCount: value })
  }

  renderViewStars(value) {
    value = 5 - (parseInt(value) || 0);

    return (
      <div className="star-group">
        { Array(5).fill(0).map((_, index) => (
          <button type="button"
            key={index}
            className={`star${ value <= index ? ' active' : '' }`}
          >
            <i className="fas fa-star" />
          </button>
        )) }
      </div>
    );
  }

  renderActionStars(value) {
    value = 5 - (parseInt(value) || 0);

    return (
      <div className="star-group">
        { Array(5).fill(0).map((_, index) => (
          <button type="button"
            onClick={() => this.clickStar(5 - index) }
            id={ `star-${index}` }
            key={index}
            className={`star${ value <= index ? ' active' : '' }`}
          >
            <i className="fas fa-star" />
          </button>
        )) }
      </div>
    );
  }

  renderReviews(reviews) {
    const { id } = this.props.auth;

    let ownReview = null;
    const otherReviews = reviews.filter(review => {
      if (`${review.customerId}` == `${id}`) {
        ownReview = review;
        return false;
      }

      return true;
    });

    const sortedReviews = ownReview ? [
      ownReview,
      ...otherReviews
    ] : otherReviews

    return (
      <div id="reviews">
        <h1>Reviews</h1>
        
        { !sortedReviews.length && (<div> There are no reviews for this product</div>) }
        { sortedReviews.map(review => {
          const { rating, review: reviewText, Auth: { email } } = review;

          return (
            <div key={review.id} className="review clearfix">
              <img src="/images/avatar.png" />
              <div className="content">
                <div className="clearfix">
                  <span>{ email.split('@')[0] }</span>
                  <span>{ this.renderViewStars(rating) }</span>
                </div>
                <p>
                  { reviewText }
                </p>
              </div>
            </div>
          );
        }) }
      </div>
    );
  }

  renderView(product) {
    const {
      Shop: { name: shopName },
      title, image, price,
      Reviews, canPostReview
    } = product;

    const avgRating = this.calculateAverageRating(Reviews);

    return (
      <div id="product-page">
        <div className="aligner">
          <header>
            <span>
              <i className="fab fa-accessible-icon" />
            </span>
            { title }
          </header>
          
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <div id="info">
                <header>Product Image</header>
                <img src={image} />
                
                <header>Product Details</header>
                <div className="detail mt-3">Shop : { shopName }</div>
                <div className="detail">Price : {price}</div>
                <div className="detail">Average Rating : {avgRating}</div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-8" id="right-side">
              <div id="wrap">

                { canPostReview && (
                    <div id="review-post-section">
                      <textarea
                        onChange={this.reviewChange}
                        value={this.state.review}
                        placeholder="What do you think about this product"
                      />
                      <div className="textarea-base clearfix">
                        <span>Enter your review above and provide rating for product</span>
                        <button
                          type="button"
                          id="post"
                          onClick={this.handlePostReview}
                        >
                          Post Review
                        </button>
                        
                        <div id="star-container">
                          { this.renderActionStars(this.state.starCount, true) }
                        </div>
                      </div>
                    </div>
                )}

                { this.renderReviews(Reviews) }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { product } = this.props;
    return !product ? null : this.renderView(product)
  }
}

const mapStateToProps = ({ authReducer, productReducer }) => ({
  product: productReducer.product,
  auth: authReducer
});

const mapDispatchToProps = { getProduct, postReview };

export default connect(mapStateToProps, mapDispatchToProps)(Product);
