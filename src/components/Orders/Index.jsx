import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../stylesheets/orders.scss';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id="orders">
        <div className="aligner">
          <div className="order">
            <div className="order-header clearfix">
              <span>Order ID : { "3945T312F7" }</span>
              <span>Date : { "12 / 03 / 2019" }</span>
            </div>

            <div className="order-table">
              { [1,2].map(() => (
              <div className="row">
                <div className="col col-lg-3">
                  <img src="/images/products/1.jpg" />
                </div>
                <div className="col col-lg-3">
                  <span>Product name</span>
                </div>
                <div className="col col-lg-3">
                  <span>Quantity</span>
                </div>
                <div className="col col-lg-3">
                  <span>Price</span>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, null)(Orders);
