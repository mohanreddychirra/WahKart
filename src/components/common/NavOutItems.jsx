import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class NavOutItems extends Component {
  render() {
    const { auth, logout, orders, cart } = this.props;

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}


export default NavOutItems;
