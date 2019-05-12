import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import { logout } from '../../actions/authAction';
import { setNavBarShow, setOverlayShow } from '../../actions/appAction';
import { setHomeCategoryId, setHomeSearchQuery, getHomeProducts, setFilterApplied, setSearchApplied } from '../../actions/homeAction';
import NavOutItems from './NavOutItems';
import Overlay from './Overlay';
import history from '../../history';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      category: this.props.homeCategoryId
    }
    this.productAddClick = this.productAddClick.bind(this);
    this.navIconClick = this.navIconClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchClear = this.handleSearchClear.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.homeCategoryId !== nextProps.homeCategoryId) {
      this.setState({ category: nextProps.homeCategoryId });
    }

    return true;
  }

  setNavCompShow(show) {
    this.props.setNavBarShow(show);
    this.props.setOverlayShow(show);
  }

  navIconClick() {
    this.setNavCompShow(!this.props.showNavBar);
  }

  linkClick() {
    this.setNavCompShow(false);
    history.push('/');
  }

  handleSearchChange(event) {
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
  }

  handleSearchClear() {
    const { homeCategoryId } = this.props; 
    history.push('/');
    this.props.setHomeSearchQuery('');
    this.setState({ search: '' });
    this.props.setFilterApplied(false);
    this.props.setSearchApplied(false);
    this.props.getHomeProducts(homeCategoryId, '', {}, 1);
  }

  handleSearch() {
    const { search, category } = this.state;
    if(search.trim() == '') return;
    this.props.setHomeCategoryId(category);
    this.props.setHomeSearchQuery(search);
    this.props.setFilterApplied(false);
    this.props.setSearchApplied(true);
    this.props.getHomeProducts(category, search, {}, 1);
    history.push('/');
  }

  productAddClick() {
    history.push('/product/add');
  }

  render() {
    const { search, category } = this.state;
    const {showNavBar, orders, request,cart, auth, logout, categories, searchApplied} = this.props;
    
    return (
      <Fragment>
        <div id="header">
          <div className="aligner clearfix">
            <Link to='#' onClick={() => this.linkClick('/')}>
              <span className="page-name">
                {
                  auth.role === 'vendor' && request
                    ? request.shopName
                    : 'Wahkart'
                }
              </span>
            </Link>
            
            <div id="search-div">
              <input
                type="text"
                name="search"
                value={search}
                onChange={this.handleSearchChange}
                placeholder="Search"
              />

              <div id="buttons" className="clearfix">
                <button type="button" onClick={this.handleSearch}>
                  <i className="fas fa-search" />
                </button>

                { searchApplied && (
                  <button type="button" id="times" onClick={this.handleSearchClear}>
                    <i className="fas fa-times" />
                  </button>
                ) }
              </div>
            </div>
            
            <div id="category-dropdown">
              <select
                name="category"
                value={category}
                onChange={this.handleSearchChange}
              >
                <option value=''>All Products</option>
                { categories.map(category => (
                  <option value={category.id} key={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {auth.role === 'vendor' && request && (
              <div id="product-add">
                <button onClick={this.productAddClick}>
                  <i className="fas fa-plus-circle" />
                </button>
              </div>
            )}

            <div id="nav-icon">
              <Link to="#" onClick={() => this.navIconClick()}>
                <span className="fa-icon">
                  <i className={`fas fa-${ showNavBar ? 'times' : 'bars'}`}/>
                </span>
              </Link>
              { showNavBar && (
                <Fragment>
                  <Overlay />
                  <NavBar /> 
                </Fragment>
              )}
            </div>

            <div id="nav-out-items">
              <NavOutItems
                auth={auth}
                orders={orders}
                cart={cart}
                logout={logout}
              />
            </div>
          </div>
        </div>

        <div id="header-spacer" />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  cart: state.cartReducer,
  orders: state.orderReducer.orders,
  request: state.vendorReducer.request,
  showNavBar: state.appReducer.showNavBar,
  categories: state.categoryReducer.categories,
  homeCategoryId: state.homeReducer.homeCategoryId,
  homeSearchQuery: state.homeReducer.homeSearchQuery,
  searchApplied: state.homeReducer.searchApplied,
  
});

const mapDispatchToProps = {
  logout, setNavBarShow,
  setOverlayShow,
  setHomeCategoryId,
  setHomeSearchQuery,
  setFilterApplied,
  getHomeProducts,
  setSearchApplied
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
