import React, { Component } from 'react';

class Product extends Component {
  constructor(props) {
    super(props);
    this.renderActionStars = this.renderActionStars.bind(this);
    this.renderViewStars = this.renderViewStars.bind(this);
    this.clickStar = this.clickStar.bind(this);
    this.hoverStar = this.hoverStar.bind(this);
  
    this.state = {
      starCount: 0
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

  render() {
    return (
      <div id="product-page">
        <div className="aligner">
          <header>
            <span>
              <i className="fab fa-accessible-icon" />
            </span>
            Product Title
          </header>
          
          <div className="row">
            <div className="col-lg-8" id="right-side">
              <div id="wrap">
                <textarea placeholder="What do you think about this product" />
                <div className="textarea-base clearfix">
                  <span>Enter your review above and provide rating for product</span>
                  <button type="button" id="post">Post Review</button>
                  
                  <div id="star-container">
                    { this.renderActionStars(this.state.starCount, true) }
                  </div>
                </div>
                
                <div id="reviews">
                  <h1>Reviews</h1>
                  
                  <div className="review clearfix">
                    <img src="/images/avatar.png" />
                    <div className="content">
                      <div className="clearfix">
                        <span>Customer</span>
                        <span>{ this.renderViewStars(3) }</span>
                      </div>
                      <p>
                        This is the content of the review and this is a duplicate
                        This is the content of the review and this is a duplicate
                        This is the content of the review and this is a duplicate
                        This is the content of the review and this is a duplicate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div id="info">
                <header>Product Image</header>
                <img src="/images/products/1.jpg" />
                
                <header>Product Details</header>
                <div className="detail">Vendor : Jumia</div>
                <div className="detail">Price : $56555</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
