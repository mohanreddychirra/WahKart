import React, { Component } from 'react';

class Product extends Component {
  constructor(props) {
    super(props);
    this.renderStars = this.renderStars.bind(this);
    this.state = {}
  }

  renderStars(value) {
    return (
      [1,2,3,4,5].map(() => (
        <button className="star" type="button">
          <i className="fas fa-star" />
        </button>
      ))
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
                  
                  <div>{ this.renderStars(3) }</div>
                </div>
                
                <div id="reviews">
                  <h1>Reviews</h1>
                  
                  <div className="review clearfix">
                    <img src="/images/avatar.png" />
                    <div className="content">
                      <div className="clearfix">
                        <span>Customer</span>
                        <span>{ this.renderStars(3) }</span>
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
