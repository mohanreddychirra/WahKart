import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import history from '../../history'; 

class Product extends Component {
  constructor(props) {
    super(props);
    this.renderActionStars = this.renderActionStars.bind(this);
    this.renderViewStars = this.renderViewStars.bind(this);
    this.clickStar = this.clickStar.bind(this);
    this.hoverStar = this.hoverStar.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderReviews = this.renderReviews.bind(this);

    this.state = {
      starCount: 0
    }
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
  
  hoverStar() {
    this.setState({ starCount: 0 })
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
            onMouseEnter={this.hoverStar}
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
    return (
      <div id="reviews">
        <h1>Reviews</h1>
        
        { !reviews.length && (<div> There are no reviews for this product</div>) }
        { reviews.map(review => {
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
    const { title, image, price, Reviews, canPostReview } = product;

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
            <div className="col-lg-8" id="right-side">
              <div id="wrap">

                { canPostReview && (
                    <div id="review-post-section">
                      <textarea placeholder="What do you think about this product" />
                      <div className="textarea-base clearfix">
                        <span>Enter your review above and provide rating for product</span>
                        <button type="button" id="post">Post Review</button>
                        
                        <div id="star-container">
                          { this.renderActionStars(this.state.starCount, true) }
                        </div>
                      </div>
                    </div>
                )}

                { this.renderReviews(Reviews) }
              </div>
            </div>

            <div className="col-lg-4">
              <div id="info">
                <header>Product Image</header>
                <img src={image} />
                
                <header>Product Details</header>
                <div className="detail">Vendor : Jumia</div>
                <div className="detail">Price : {price}</div>
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

const mapStateToProps = ({ productReducer }) => ({
  product: productReducer.product
});

const mapDispatchToProps = { getProduct };

export default connect(mapStateToProps, mapDispatchToProps)(Product);
