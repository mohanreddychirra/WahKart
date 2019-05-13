import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate'; 
import ProductList from '../common/ProductList';
import Spinner from '../common/Spinner';
import CategoriesNav from '../common/CategoriesNav';
import { getHomeProducts, setHomeCategoryId, setFilterApplied, setSearchApplied } from '../../actions/homeAction';
import { getCategories } from '../../actions/categoryAction';
import Filter from '../common/Filter';

import '../../stylesheets/home.scss';
import Footer from '../common/Footer';

class Home extends Component{
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }
  
  componentWillMount() {
    const { homeSearchQuery } = this.props;
    this.props.getCategories();
    this.props.getHomeProducts('', homeSearchQuery, 1, {});
  }

  handleCategoryClick(categoryId) {
    if(this.props.homeCategoryId != categoryId) {
      this.props.setHomeCategoryId(categoryId);
      this.props.getHomeProducts(categoryId, '', 1, {});
      this.props.setFilterApplied(false);
      this.props.setSearchApplied(false);
    }
  }

  onPageChange({ selected: pageIndex }) {
    const { homeCategoryId, filterApplied, filter, searchApplied, homeSearchQuery } = this.props;
    const page = pageIndex + 1;
    const useFilter = filterApplied ? filter : {};
    const query = searchApplied ? homeSearchQuery : '';
    this.props.getHomeProducts(homeCategoryId, query, page, useFilter);
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
                  There are no products to display
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
        <Footer />
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
  filter: state.homeReducer.filter,
  homeSearchQuery: state.homeReducer.homeSearchQuery,
  searchApplied: state.homeReducer.searchApplied
});

const mapDispatchToProps = {
  getCategories,
  setHomeCategoryId,
  getHomeProducts,
  setFilterApplied,
  setSearchApplied
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
