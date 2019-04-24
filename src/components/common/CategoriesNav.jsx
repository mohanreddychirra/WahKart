import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../stylesheets/category_nav.scss';

class CategoriesNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    }
  }

  render() {
    const { categories } = this.props;
    const { active } = this.state;

    return (
      <div id="category-nav" className="clearfix">
        <Link to="#">
          <span
            className={`${active === 0 ? 'active' : ''}`}
          >
            All Products
          </span>
        </Link>

        { categories.map(category => (
          <Link key={category.id} to="#">
            <span
              className={`${active === category.id ? 'active' : ''}`}
            >
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesNav);
