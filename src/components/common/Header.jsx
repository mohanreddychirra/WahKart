import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import { logout } from '../../actions/authAction';
import { setNavBarShow, setOverlayShow, setHomeCategoryId } from '../../actions/appAction';
import NavOutItems from './NavOutItems';
import Overlay from './Overlay';
import history from '../../history';
import { searchProducts } from '../../actions/productAction';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      category: this.props.homeCategoryId
    }

    this.navIconClick = this.navIconClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    
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

  handleSearch() {
    const { search, category } = this.state;
    if(search.trim() == '') return;
    this.props.setHomeCategoryId(category);
    this.props.searchProducts(search, category);
  }

  render() {
    const { search, category } = this.state;

    const {
      showNavBar, orders, request,
      cart, auth, logout, categories,
    } = this.props;

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

              <button type="button" onClick={this.handleSearch}>
                <i className="fas fa-search" />
              </button>
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
  homeCategoryId: state.appReducer.homeCategoryId
});

const mapDispatchToProps = {
  logout, setNavBarShow,
  setOverlayShow,
  setHomeCategoryId,
  searchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
