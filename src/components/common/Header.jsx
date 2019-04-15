import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authAction';
import { toogleNavBar } from '../../actions/navbarAction';
import NavOutItems from './NavOutItems';

const Header = ({
  toogleNavBar: navbarClick,
  show, orders, request, cart,
  auth, logout
}) => (
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
          <Link to="#" onClick={() => navbarClick()}>
            <span>
              <i className={`fas fa-${ show ? 'times' : 'bars'}`}/>
            </span>
          </Link>
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

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  cart: state.cartReducer,
  orders: state.orderReducer.orders,
  request: state.vendorReducer.request,
  show: state.navbarReducer.show
});

const mapDispatchToProps = {
  logout, toogleNavBar
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
