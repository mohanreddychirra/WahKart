import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate'; 
import ProductList from '../common/ProductList';
import Spinner from '../common/Spinner';
import CategoriesNav from '../common/CategoriesNav';
import { setHomeCategoryId } from '../../actions/appAction';
import { getProductsByCategory } from '../../actions/productAction';
import { getCategories } from '../../actions/categoryAction';
import Filter from './Filter';

import '../../stylesheets/home.scss';

class Home extends Component{
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.loadProducts = this.loadProducts.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    
    this.state = {
      loadProducts: true,
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
    this.loadProducts('', 1);
  }

  // doFilter(updates) {
  //   const params = { ...this.state, ...updates };
  //   this.props.setHomeProducts(params);
  //   this.setState({ ...params });
  // }

  // handleShopClick(id, checked) {
  //   let shopIds = this.state.shopIds;
  //   if (checked) { shopIds.push(id); }
  //   else { shopIds = shopIds.filter(shopId => `${shopId}` !== `${id}`); }
  //   this.doFilter({ shopIds: [ ...shopIds ] });
  // }

  // handlePriceRangeSet(min, max) {
  //   this.doFilter({ price: { min, max } });
  // }

  handleCategoryClick(categoryId) {
    this.props.setHomeCategoryId(categoryId);
    this.loadProducts(categoryId, 1);
  }

  onPageChange({ selected: page }) {
    this.loadProducts(this.props.homeCategoryId, page+1);
  }

  loadProducts(categoryId, page) {
    categoryId = categoryId == '' ? null : parseInt(categoryId);
    this.props.getProductsByCategory(categoryId, page);
  }

  render() {
    const { auth, categories, loading, products, homeCategoryId, pagination } = this.props;
    const { shopIds } = this.state;
    const  { pageCount, page } = pagination;

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
              { loading && <Spinner />}
              { !loading && !products.length
                  ? <div className="no-prod">There are no products in this category</div>
                  : (
                    <div>
                      <ProductList
                        products={products}
                        auth={auth}
                      />
                      <div className="pagination">
                        <ReactPaginate
                          previousLabel="Prev"
                          nextLabel="Next"
                          pageCount={pageCount}
                          pageRangeDisplayed={10}
                          marginPagesDisplayed={5}
                          activeClassName="active-page"
                          onPageChange={this.onPageChange}
                          initialPage={page - 1}
                        />
                      </div>
                    </div>
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
  products: state.productReducer.products,
  pagination: state.productReducer.pagination,
  loading: state.productReducer.loading,
  homeCategoryId: state.appReducer.homeCategoryId
});

const mapDispatchToProps = {
  getCategories,
  setHomeCategoryId,
  getProductsByCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
