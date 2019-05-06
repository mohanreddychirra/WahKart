import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Wrapper from './Wrapper';
import ProductList from '../common/ProductList';

import '../../stylesheets/vendor.scss';

class Vendor extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { request, auth, products } = this.props;

    return (
      <Wrapper>
        { request && (
          <div id="vendor-products">
            <ProductList
              products={products}
              auth={auth}
              isVendorPage
            />
          </div>
        )}
      </Wrapper>
    );
  }
}


const mapStateToProps = state => ({
  request: state.vendorReducer.request,
  products: state.vendorReducer.products,
  auth: state.authReducer
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);
