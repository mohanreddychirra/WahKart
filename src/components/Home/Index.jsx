import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate'; 
import ProductList from '../common/ProductList';
import Spinner from '../common/Spinner';
import CategoriesNav from '../common/CategoriesNav';
import { getHomeProducts, setHomeCategoryId, setFilterApplied } from '../../actions/homeAction';
import { getCategories } from '../../actions/categoryAction';
import Filter from './Filter';

import '../../stylesheets/home.scss';

class Home extends Component{
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }
  
  componentWillMount() {
    this.props.getCategories();
    this.props.getHomeProducts('', '', 1, {});
  }

  handleCategoryClick(categoryId) {
    if(this.props.homeCategoryId != categoryId) {
      this.props.setHomeCategoryId(categoryId);
      this.props.getHomeProducts(categoryId, '', 1, {});
      this.props.setFilterApplied(false);
    }
  }

  onPageChange({ selected: pageIndex }) {
    const { homeCategoryId } = this.props;
    const { filterApplied, filter } = this.props;
    const page = pageIndex + 1;
    const useFilter = filterApplied ? filter : {};
    this.props.getHomeProducts(homeCategoryId, '', page, useFilter);
  }

  render() {
    const { auth, categories, loading, products, homeCategoryId, pagination } = this.props;
    const  { pageCount, page } = pagination;

    return (
      <div id="home-wrapper" className="clearfix">
        <div id="sidebar">
          <Filter />
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

              { !loading && !products.length && (
                <div className="no-prod">
                  There are no products in this category
                </div>
              )}
              
              { !loading && !!products.length && (
                <div>
                  <ProductList
                    products={products}
                    auth={auth}
                  />
                  <div className="pagination">
                    <ReactPaginate
                      previousLabel="Prev"
                      nextLabel="Next"
                      disableInitialCallback
                      pageCount={pageCount}
                      pageRangeDisplayed={10}
                      marginPagesDisplayed={5}
                      activeClassName="active-page"
                      onPageChange={this.onPageChange}
                      initialPage={page - 1}
                    />
                  </div>
                </div>
              )}
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
  products: state.homeReducer.products,
  pagination: state.homeReducer.pagination,
  loading: state.homeReducer.loading,
  homeCategoryId: state.homeReducer.homeCategoryId,
  filterApplied: state.homeReducer.filterApplied,
  filter: state.homeReducer.filter
});

const mapDispatchToProps = {
  getCategories,
  setHomeCategoryId,
  getHomeProducts,
  setFilterApplied
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
