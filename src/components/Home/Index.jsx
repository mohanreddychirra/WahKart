import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import Spinner from '../common/Spinner';
import { loadProducts, setHomeProducts } from '../../actions/productAction';
import CategoriesNav from '../common/CategoriesNav';
import { setHomeCategoryId } from '../../actions/appAction';
import { getCategories } from '../../actions/categoryAction';
import Filter from './Filter';

import '../../stylesheets/home.scss';

class Home extends Component{
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleShopClick = this.handleShopClick.bind(this);
    this.handlePriceRangeSet = this.handlePriceRangeSet.bind(this);
    this.doFilter = this.doFilter.bind(this);
    
    this.state = {
      categoryId: '',
      price: {
        min: '',
        max: ''
      },
      shopIds: []
    }
  }
  
  componentWillMount() {
    this.props.getCategories();
    this.props.loadProducts();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading === true && nextProps.loading === false) {
      this.props.setHomeProducts(this.state);
    }
  }

  doFilter(updates) {
    const params = { ...this.state, ...updates };
    this.props.setHomeProducts(params);
    this.setState({ ...params });
  }

  handleCategoryClick(categoryId) {
    this.props.setHomeCategoryId(categoryId);
    this.doFilter({ categoryId });
    
  }

  handleShopClick(id, checked) {
    let shopIds = this.state.shopIds;
    if (checked) { shopIds.push(id); }
    else { shopIds = shopIds.filter(shopId => `${shopId}` !== `${id}`); }
    this.doFilter({ shopIds: [ ...shopIds ] });
  }

  handlePriceRangeSet(min, max) {
    this.doFilter({ price: { min, max } });
  }

  render() {
    const { auth, categories, loading, products, homeCategoryId } = this.props;
    const { shopIds } = this.state;

    return (
      <div id="home-wrapper" className="clearfix">
        <div id="sidebar">
          <Filter
            handlePriceRangeSet={this.handlePriceRangeSet}
            handleShopClick={this.handleShopClick}
            handleCategoryClick={this.handleCategoryClick}
            shopIds={shopIds}
          />
        </div>
        <div id="content">
          <div id="home" className="aligner">
            <CategoriesNav
              active={homeCategoryId}
              categories={categories}
              onClick={this.handleCategoryClick}
            />
      
            <div id="home-products">
              { loading
                  ? <Spinner />
                  : (
                      !products.length
                        ? <div className="no-prod">There are no products in this category</div>
                        : (
                          <ProductList
                            products={products}
                            auth={auth}
                          />
                        )
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
  auth: state.authReducer,
  categories: state.categoryReducer.categories,
  products: state.productReducer.homeProducts,
  loading: state.productReducer.loading,
  homeCategoryId: state.appReducer.homeCategoryId
});

const mapDispatchToProps = {
  loadProducts,
  getCategories,
  setHomeCategoryId,
  setHomeProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
