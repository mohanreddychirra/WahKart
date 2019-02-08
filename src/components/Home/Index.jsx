import React, { Component, Fragment } from 'react';
import SearchField from './SearchField';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import NoProducts from './NoProducts';
import { openModal } from '../../actions/modalAction';
import { setSearchResult } from '../../actions/productAction';

import '../../stylesheets/home.scss';

class Home extends Component{
  constructor(props) {
    super(props);
    this.openFilterModal = this.openFilterModal.bind(this);
    this.searchTextChange = this.searchTextChange.bind(this);
    this.state = {
      searchText: ''
    }
  }

  openFilterModal() {
    this.props.openModal('productFilter');
  }

  searchTextChange(event) {
    let { target: { value } } = event;
    const { products } = this.props;

    const results = products.filter(
      product => value.toLowerCase() === product.title.toLowerCase().substr(0, value.length)
    );

    this.setState({ searchText: value });
    this.props.setSearchResult(results);
  }

  render() {
    return (
      <div id="home" className="aligner">

        {
          this.props.products.length > 0
          ? (
            <Fragment>
              <SearchField
                value={this.state.searchText}
                onChange={this.searchTextChange}
                role={this.props.auth.role}
                openFilterModal={this.openFilterModal}
              />

              <ProductList
                auth={this.props.auth}
                products={
                  this.props.searchResult === null
                    ? this.props.products
                    : this.props.searchResult
                }
              />
            </Fragment>
          )
          : <NoProducts />
        }
        
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  searchResult: state.productReducer.searchResult,
  auth: state.authReducer
});

const mapDispatchToProps = {
  openModal,
  setSearchResult
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
