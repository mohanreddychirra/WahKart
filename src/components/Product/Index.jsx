import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import history from '../../history'; 
import { postReview, reviewEdit, updateReview, deleteReview } from '../../actions/reviewAction';
import ReviewList from './ReviewList';
import toastr from 'toastr';
import Stars from './Stars';
import { setProductViewed } from '../../actions/customerAction';

class Product extends Component {
  constructor(props) {
    super(props);
    this.clickStar = this.clickStar.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handlePostReview = this.handlePostReview.bind(this);
    this.reviewChange = this.reviewChange.bind(this);
    this.calculateAverageRating = this.calculateAverageRating.bind(this);
    this.reviewEditClick = this.reviewEditClick.bind(this);
    this.handleDeleteReview = this.handleDeleteReview.bind(this);

    this.state = {
      postMode: true, 
      starCount: 0,
      review: '',
      error: null
    }
  }

  reviewEditClick(id, review, starCount) {
    this.props.reviewEdit(id);
    this.setState({
      review,
      starCount,
      postMode: false
    });
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

  handleDeleteReview(reviewId) {
    this.props.deleteReview(reviewId);
    this.setState({ postMode: true });
  }

  handlePostReview() {
    const { starCount, review, postMode } = this.state;
    const { match: { params: { productId } }} = this.props;

    const handler = postMode ? this.props.postReview : this.props.updateReview;
    
    handler(productId, review, starCount)
      .then((message) => {
        if (message !== true) {
          toastr.error(message);
        }

        else {
          this.setState({
            review: '',
            starCount: 0,
            postMode: true
          });
        }
      })
      .catch(() => {})
  }

  componentWillMount() {
    const { match: { params: { productId } }} = this.props;
    this.props.getProduct(productId);
  }

  componentWillReceiveProps(nextProps) {
    const { product, auth } = nextProps;

    if (product === false) {
      history.push('/');
      return
    } else if (product && auth && auth.role == 'customer') {
      this.props.setProductViewed(product);
    }
  }

  clickStar(value) {
    this.setState({ starCount: value });
  }

  renderView(product) {
    const { postMode, starCount } = this.state;
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
                        <p>Enter your review above and provide rating for product</p>
                        <Stars
                          initialRating={starCount}
                          onClick={value => this.clickStar(value)}
                        />
                        
                        <button
                          type="button"
                          id="post"
                          onClick={this.handlePostReview}
                        >
                          { postMode ? 'Post' : 'Update' } Review
                        </button>
                      </div>
                    </div>
                )}

                <ReviewList
                  auth={this.props.auth}
                  reviews={Reviews}
                  reviewEditClick={this.reviewEditClick}
                  handleDeleteReview={this.handleDeleteReview}
                />
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

const mapDispatchToProps = {
  getProduct, postReview,
  reviewEdit, updateReview,
  deleteReview, setProductViewed
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
