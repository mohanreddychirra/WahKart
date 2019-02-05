import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authAction';

const Header = ({ cart, auth, logout }) => (
  <div id="header">
    <div className="aligner clearfix">
      <Link to='/'>
        <span className="page-name">WahKart</span>
      </Link>

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
  
            <Link to="#">
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
          <Link to="/cart">
            <div id="cart">
              <i className="fas fa-cart-arrow-down" />
              <span>{ cart.length }</span>
            </div>
          </Link>
        )
      }

      <Link to="/orders">
        <span className="navlink">ORDERS</span>
      </Link>

      {
        auth.role === 'vendor' && (
          <Link to="/product/add">
            <span id="add-plus">
              <i className="fas fa-plus-circle" />
            </span>
          </Link>
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  cart: state.cartReducer
});

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
