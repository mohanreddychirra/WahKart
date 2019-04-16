import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import history from '../../history';
import { setNavBarShow, setOverlayShow } from '../../actions/appAction';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.clickWrap = this.clickWrap.bind(this);
    this.logoutAction = this.logoutAction.bind(this);
  }

  setNavCompShow(show) {
    this.props.setNavBarShow(show);
    this.props.setOverlayShow(show);
  }

  clickWrap(path) {
    this.setNavCompShow(false);
    history.push(path);
  }

  logoutAction() {
    this.setNavCompShow(false);
    this.props.logout();
  }

  render() {
    const { auth, orders, cart } = this.props;

    return (
      <div id="navbar">
        <div className="heading">NAVIGATION</div>
        { auth.id && auth.role && auth.email && (
          <div>
            <div id="navbar-image" className="clearfix">
              <Link to="#" onClick={() => this.clickWrap(
                ['vendor', 'admin'].includes(auth.role)
                  ? `/${auth.role}`
                  : '#'
              )}>
                <img src="/images/avatar.png" alt="user avatar"/>
                <span>{ auth.email.split('@')[0] }</span>
              </Link>
            </div>

            { auth.role === 'customer' && (
              <Fragment>
                <Link to="#" onClick={() => this.clickWrap("/orders")}>
                  <div className="nav-item clearfix">
                    <span>ORDERS</span>
                    <i className="badge">{ orders.length}</i>
                  </div>
                </Link>

                <Link to="#" onClick={() => this.clickWrap("/cart")}>
                  <div className="nav-item clearfix">
                    <span>CART</span>
                    <i className="badge">{ cart.length}</i>
                  </div>
                </Link>
              </Fragment>
            )}

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
  request: state.vendorReducer.request,
  show: state.appReducer.showNavBar
});
const mapDispatchToProps = { logout, setNavBarShow, setOverlayShow }

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

