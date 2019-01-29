import React from 'react';
import { Link } from 'react-router-dom';

const SearchField = ({ value, onChange, onVendorFilterChange }) => (
  <div id="search-field" className="clearfix">
    <input
      type="text"
      placeholder="Search for products ..."
      value={value}
      onChange={onChange}
    />

    <select
      onChange={onVendorFilterChange}
      id="vendor-filter"
    >
      <option value="">-- Select --</option>
      <option value="1">Vendor 1 Shop</option>
      <option value="2">Vendor 2 Shop</option>
    </select>
  </div>
);

export default SearchField;
