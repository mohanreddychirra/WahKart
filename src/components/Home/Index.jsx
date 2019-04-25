import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import Spinner from '../common/Spinner';
import { loadProducts, setHomeProducts } from '../../actions/productAction';
import CategoriesNav from '../common/CategoriesNav';
import { getCategories } from '../../actions/categoryAction';
import Filter from './Filter';

import '../../stylesheets/home.scss';

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: null
    }
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }
  
  componentWillMount() {
    this.props.getCategories();
    this.props.loadProducts();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading === true && nextProps.loading === false) {
      this.props.setHomeProducts(null);
    }
  }

  handleCategoryClick(categoryId) {
    this.setState({ currentCategory: categoryId });
    this.props.setHomeProducts(categoryId);
  }

  /**
   * 
   * @description Handles page access via link
   * 
   * @param {*} nextProps 
   */
  // componentWillMount() {
  //   const { request, auth: { role, inProgress } } = this.props;

  //   this.props.getCategories();

  //   if(!inProgress) {
  //     if (role === 'vendor' && request && request.status !== 'approved' ) {
  //       history.push('/vendor');
  //     }

  //     if (role !== 'vendor') {
  //       this.props.loadProducts();
  //     }
  //   }
  // }

  /**
   * 
   * @description Handles when page is reloaded
   * 
   * @param {*} nextProps 
   */
  // shouldComponentUpdate(nextProps) {
  //   const { auth } = this.props;
  //   const { request, auth: nextAuth } = nextProps;

  //   if (auth.inProgress === true && nextAuth.inProgress === false) {
  //     if (nextAuth.role === 'vendor' && request && request.status !== 'approved') {
  //       history.push('/vendor');
  //       return false;
  //     }

  //     if (nextAuth.role !== 'vendor') {
  //       this.props.loadProducts();
  //     }
  //   }
    
  //   if (auth.role && !nextAuth.role) {
  //     this.props.loadProducts();
  //   }

  //   return true;
  // }

  render() {
    const { categories, loading, products } = this.props;
    const { currentCategory } = this.state;

    return (
      <div id="home-wrapper" className="clearfix">
        <div id="sidebar">
          <Filter />
        </div>
        <div id="content">
          <div id="home" className="aligner">
            <CategoriesNav
              active={currentCategory}
              categories={categories}
              onClick={this.handleCategoryClick}
            />
      
            <div id="home-products">
              { loading
                  ? <Spinner />
                  : (
                      !products.length
                        ? <div className="no-prod">There are no products in this category</div>
                        : <ProductList products={products} />
                    )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  products: state.productReducer.homeProducts,
  loading: state.productReducer.loading,
});

const mapDispatchToProps = {
  loadProducts,
  getCategories,
  setHomeProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
