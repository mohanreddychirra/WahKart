import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from './Wrapper';

import '../../stylesheets/vendor.scss';

/*
            OrderId
            Customer Email
            Number products
            Amount
            Order Date
*/

class VendorOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Wrapper>
        <div id="vendor-orders-wrap">
          <header className="head">
            <span>5</span>
            Orders from customers
          </header>

          <div id="vendor-orders">
            <div className="row">
              <div className="col-12 col-md-3">
                <i className="fas fa-tally" />
                <span>E32498UBR3BB</span>
              </div>
              
              <div className="col-12 col-md-3">
                <i className="fa fa-envelope-open-text" />
                <span>customer@gmail.com</span>
              </div>

              <div className="col-12 col-md-2">
                <i className="fas fa-globe" />
                <span>20 Products</span>
              </div>

              <div className="col-12 col-md-2">
                <i className="fas fa-money-bill-alt" />
                <span>$5000</span>
              </div>

               <div className="col-12 col-md-2">
                <i className="fas fa-calendar" />
                <span>2019-09-03</span>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}


const mapStateToProps = state => ({ });
const mapDispatchToProps = { };
export default connect(mapStateToProps, mapDispatchToProps)(VendorOrders);
