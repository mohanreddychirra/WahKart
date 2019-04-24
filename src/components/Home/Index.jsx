import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import NoProducts from './NoProducts';
import { loadProducts, setSearchResult } from '../../actions/productAction';
import history from '../../history';
import CategoriesNav from '../common/CategoriesNav';
import { getCategories } from '../../actions/categoryAction';
import Filter from './Filter';

import '../../stylesheets/home.scss';

class Home extends Component{
  constructor(props) {
    super(props);
  }
  
  /**
   * 
   * @description Handles page access via link
   * 
   * @param {*} nextProps 
   */
  componentWillMount() {
    const { request, auth: { role, inProgress } } = this.props;

    this.props.getCategories();

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

  render() {
    const { categories } = this.props;

    return (
      <div id="home-wrapper" className="clearfix">
        <div id="sidebar">
          <Filter />
        </div>
        <div id="content">
          <div id="home" className="aligner">
            <CategoriesNav categories={categories} />
      
            <div id="home-products">
              {
                this.props.products.length > 0
                ? (
                  <Fragment>
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
                : <NoProducts role={this.props.auth.role} />
              }
            </div>  
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  searchResult: state.productReducer.searchResult,
  auth: state.authReducer,
  request: state.vendorReducer.request,
  categories: state.categoryReducer
});

const mapDispatchToProps = {
  setSearchResult,
  loadProducts,
  getCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
