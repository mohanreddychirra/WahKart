import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../../public/images/avatar.png';

const Header = () => (
  <div id="header">
    <div className="aligner clearfix">
      <Link to='/'>
        <span className="page-name">WahKart</span>
      </Link>

      <Link to="/login">
        <span className="navlink">LOGIN</span>
      </Link>

      <Link to="/register">
        <span className="navlink">REGISTER</span>
      </Link>

      <Link to="#">
        <div id="profile" className="clearfix">
          <img src={avatar} alt="user avatar"/>
          <span>Username</span>
        </div>
      </Link>

      <Link to="#">
        <div id="cart">
          <i className="fas fa-cart-arrow-down" />
          <span>12</span>
        </div>
      </Link>

      <Link to="#">
        <span id="add-plus">
          <i className="fas fa-plus-circle" />
        </span>
      </Link>
    </div>
  </div>
);

export default Header;
