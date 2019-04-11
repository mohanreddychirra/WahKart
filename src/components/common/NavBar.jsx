import React from 'react';
import { connect } from 'react-redux';

const NavBar = () => (
  <div id="navbar">
    <div className="nav-item">
      <a href="#">Logout</a>
    </div>
  </div>
);

const mapStateToProps = () => ({});
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

