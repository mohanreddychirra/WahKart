import React from 'react';
import { Link } from 'react-router-dom';

const SearchField = () => (
  <div id="search-field" className="clearfix">
    <input type="text" placeholder="Search for products ..." />

    <button>
      <i className="fas fa-spinner" />
    </button>
  </div>
);

export default SearchField;
