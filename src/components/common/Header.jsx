import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import { logout } from '../../actions/authAction';

const Header = ({ orders, request, cart, auth, logout }) => (
  <Fragment>
    <div id="header">
      <div className="aligner clearfix">
        <Link to='/'>
          <span className="page-name">
            {
              auth.role === 'vendor' && request
                ? request.shopName
                : 'Wahkart'
            }
          </span>
        </Link>
        
        <div id="nav-icon">
          <span><i className="fas fa-bars" /></span>
          <NavBar />
        </div>

        <div style={{ display: "none" }}>
          {
            (!auth.id || !auth.role || !auth.email) && (
              <Fragment>
                <Link to="/login">
                  <span className="navlink">LOGIN</span>
                </Link>

                <Link to="/register">
                  <span className="navlink">REGISTER</span>
                </Link>
              </Fragment>
            )
          }

          {
            auth.id && auth.role && auth.email && (
              <Fragment>
                <Link to="#" onClick={logout}>
                  <span className="navlink">LOGOUT</span>
                </Link>
      
                <Link to={
                  ['vendor', 'admin'].includes(auth.role)
                    ? `/${auth.role}`
                    : '#'
                }>
                  <div id="profile" className="clearfix">
                    <img src="/images/avatar.png" alt="user avatar"/>
                    <span>{ auth.email.split('@')[0] }</span>
                  </div>
                </Link>
              </Fragment>
            )
          }

          { 
            auth.role === 'customer' && (
              <Fragment>
                <Link to="/orders">
                  <div id="order">
                    <i className="fas fa-credit-card" />
                    <span>{ orders.length }</span>
                  </div>
                </Link>

                <Link to="/cart">
                  <div id="cart">
                    <i className="fas fa-cart-arrow-down" />
                    <span>{ cart.length }</span>
                  </div>
                </Link>
            </Fragment>
            )
          }
        </div>
      </div>
    </div>
    <div id="header-spacer" />
  </Fragment>
);

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  cart: state.cartReducer,
  orders: state.orderReducer.orders,
  request: state.vendorReducer.request
});

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
