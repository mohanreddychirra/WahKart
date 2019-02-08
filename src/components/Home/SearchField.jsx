import React from 'react';
import { Link } from 'react-router-dom';

const SearchField = ({ role, value, onChange, openFilterModal }) => (
  <div id="search-field" className="clearfix">
    <input
      type="text"
      placeholder="Search for products ..."
      value={value}
      onChange={onChange}
    />
    
    { role !== 'vendor' && (
      <button
        type="button"
        onClick={openFilterModal}
      >
        Filter
      </button>
    )}

    { role === 'vendor' && (
      <Link to="/product/add">
        <button type="button">
          Add Product
        </button>
      </Link>
    )}
  </div>
);

export default SearchField;
