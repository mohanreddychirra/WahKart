import React, { Component, Fragment } from 'react';
import SearchField from './SearchField';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import NoProducts from './NoProducts';
import { openModal } from '../../actions/modalAction';
import { loadProducts, setSearchResult } from '../../actions/productAction';
import history from '../../history';

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
  
  /**
   * 
   * @description Handles page access via link
   * 
   * @param {*} nextProps 
   */
  componentWillMount() {
    const { request, auth: { role, inProgress } } = this.props;

    if(!inProgress) {
      if (role === 'vendor' && request && request.status !== 'approved' ) {
        history.push('/vendor');
      }

      if (role !== 'vendor') {
        this.props.loadProducts();
      }
    }
  }

  /**
   * 
   * @description Handles when page is reloaded
   * 
   * @param {*} nextProps 
   */
  shouldComponentUpdate(nextProps) {
    const { auth } = this.props;
    const { request, auth: nextAuth } = nextProps;

    if (auth.inProgress === true && nextAuth.inProgress === false) {
      if (nextAuth.role === 'vendor' && request && request.status !== 'approved') {
        history.push('/vendor');
        return false;
      }

      if (nextAuth.role !== 'vendor') {
        this.props.loadProducts();
      }
    }
    
    if (auth.role && !nextAuth.role) {
      this.props.loadProducts();
    }

    return true;
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
  auth: state.authReducer,
  request: state.vendorReducer.request
});

const mapDispatchToProps = {
  openModal,
  setSearchResult,
  loadProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
