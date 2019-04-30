import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="pagination clearfix">
        <Link to="#">
          <span>Prev</span>
        </Link>

        <Link to="#">
          <span>1</span>
        </Link>

        <Link to="#">
          <span>2</span>
        </Link>

        <Link to="#">
          <span>Next</span>
        </Link>
      </div>
    );
  }
}

export default Pagination;


