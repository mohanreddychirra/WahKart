import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authAction';
import avatar from '../../../public/images/avatar.png';

const Header = ({ auth, logout }) => (
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
                <img src={avatar} alt="user avatar"/>
                <span>{ auth.email.split('@')[0] }</span>
              </div>
            </Link>
          </Fragment>
        )
      }

      { 
        auth.role === 'customer' && (
          <Link to="#">
            <div id="cart">
              <i className="fas fa-cart-arrow-down" />
              <span>12</span>
            </div>
          </Link>
        )
      }

      {
        auth.role === 'vendor' && (
          <Link to="#">
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
  auth: state.authReducer
});

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
