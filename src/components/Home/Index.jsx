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
    this.handleShopClick = this.handleCategoryClick.bind(this);
    this.handlePriceRangeSet = this.handleCategoryClick.bind(this);
    
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
      this.props.setHomeProducts('');
    }
  }

  handleCategoryClick(categoryId) {
    const params = { ...this.setState, categoryId };
    this.props.setHomeCategoryId(categoryId);
    this.props.setHomeProducts(params);
    this.setState(params);
  }

  handleShopClick(id, checked) {
    let shopIds = this.state.shopIds;
    if (checked) { shopIds.push(id); }
    else { shopIds = shopIds.filter(shopId => `${shopId}` !== `${id}`); }

    // call filter hander in store
    const params = { ...this.state, shopIds }
    this.setState({ shopIds });
    this.props.setHomeProducts(params);
    this.setState(params);
  }

  handlePriceRangeSet(min, max) {
    const params = { ...this.setState, price: { min, max } };
    this.props.setHomeProducts(params);
    this.setState(params);
  }

  render() {
    const { categories, loading, products, homeCategoryId } = this.props;

    return (
      <div id="home-wrapper" className="clearfix">
        <div id="sidebar">
          <Filter
            handlePriceRangeSet={this.handlePriceRangeSet}
            handleShopClick={this.handleShopClick}
            handleCategoryClick={this.handleCategoryClick}
            shopIds={this.state.shopIds}
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
  homeCategoryId: state.appReducer.homeCategoryId
});

const mapDispatchToProps = {
  loadProducts,
  getCategories,
  setHomeCategoryId,
  setHomeProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
