import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import { toogleNavBar } from '../../actions/navbarAction';
import history from '../../history';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.clickWrap = this.clickWrap.bind(this);
    this.logoutAction = this.logoutAction.bind(this);
  }

  clickWrap(path) {
    this.props.toogleNavBar();
    history.push(path);
  }

  logoutAction() {
    this.props.toogleNavBar();
    this.props.logout();
  }

  render() {
    const { show, auth, orders, cart, logout } = this.props;
    
    return (
      <div id="navbar" style={{ display: `${show ? 'block' : 'none' }` }}>
        <div id="overlay" />
        <div id="content">
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  show: state.navbarReducer.show,
  auth: state.authReducer,
  cart: state.cartReducer,
  orders: state.orderReducer.orders,
  request: state.vendorReducer.request
});
const mapDispatchToProps = { logout, toogleNavBar }

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

