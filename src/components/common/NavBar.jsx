import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import history from '../../history';
import { toggleNavBar, toggleOverlay } from '../../actions/appAction';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.clickWrap = this.clickWrap.bind(this);
    this.logoutAction = this.logoutAction.bind(this);
  }

  clickWrap(path) {
    this.props.toggleNavBar();
    this.props.toggleOverlay();
    history.push(path);
  }

  logoutAction() {
    this.props.toggleNavBar();
    this.props.toggleOverlay();
    this.props.logout();
  }

  render() {
    const { show, auth, orders, cart, logout } = this.props;
    
    return (
      <div id="navbar">
        <div className="heading">NAVIGATION</div>
        { auth.id && auth.role && auth.email && (
          <div>
            <div id="navbar-image" className="clearfix">
              <img src="/images/avatar.png" alt="user avatar"/>
              <span>{ auth.email.split('@')[0] }</span>
            </div>

            <Link to="#" onClick={() => this.clickWrap("/orders")}>
              <div className="nav-item">ORDERS</div>
            </Link>

            <Link to="#" onClick={() => this.clickWrap("/cart")}>
              <div className="nav-item">CART</div>
            </Link>

            <Link to="#" onClick={() => this.logoutAction()}>
              <div className="nav-item">LOGOUT</div>
            </Link>
          </div>
        )}

        {(!auth.id || !auth.role || !auth.email) && (
          <div>
            <Link to="#" onClick={() => this.clickWrap("/login")}>
              <div className="nav-item">LOGIN</div>
            </Link>
            
            <Link to="#" onClick={() => this.clickWrap("/register")}>
              <div className="nav-item">REGISTER</div>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer,
  cart: state.cartReducer,
  orders: state.orderReducer.orders,
  request: state.vendorReducer.request
});
const mapDispatchToProps = { logout, toggleNavBar, toggleOverlay }

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

