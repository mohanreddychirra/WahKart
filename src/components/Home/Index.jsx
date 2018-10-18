import React, { Component } from 'react';
import SearchField from './SearchField';
import { connect } from 'react-redux';
import { loadProducts } from '../../actions/productAction';
import ProductList from './ProductList';
import NoProducts from './NoProducts';
import '../../stylesheets/home.scss';

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    return (
      <div id="home" className="aligner">
        <SearchField />

        {/* <NoProducts /> */}

        <ProductList
          products={this.props.products}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  loadProducts
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
