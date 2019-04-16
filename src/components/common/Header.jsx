import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import { logout } from '../../actions/authAction';
import { toggleNavBar } from '../../actions/appAction';
import { toggleOverlay } from '../../actions/appAction';
import NavOutItems from './NavOutItems';
import Overlay from './Overlay';
import history from '../../history';

class Header extends Component {
  constructor(props) {
    super(props);
    this.navIconClick = this.navIconClick.bind(this);
  }

  toogleNavComponent() {
    this.props.toggleOverlay();
    this.props.toggleNavBar();
  }

  navIconClick() {
    this.toogleNavComponent();
  }

  linkClick() {
    this.toogleNavComponent();
    history.push('/');
  }

  render() {
    const { showNavBar, orders, request, cart, auth, logout } = this.props;

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
            
            <div id="nav-icon">
              <Link to="#" onClick={() => this.navIconClick()}>
                <span>
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
  showNavBar: state.appReducer.showNavBar
});

const mapDispatchToProps = {
  logout, toggleNavBar, toggleOverlay
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
