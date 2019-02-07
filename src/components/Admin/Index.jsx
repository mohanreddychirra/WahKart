import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from './Wrapper';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Wrapper>
        <div className="text-center">
          Admin Dashboard
          <br />
          <Link to="/admin/requests">Vendor Requests</Link>
        </div>
      </Wrapper>
    );
  }
}

export default Admin;
