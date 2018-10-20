import React from 'react';
import { Link } from 'react-router-dom';

const SearchField = ({ value, onChange }) => (
  <div id="search-field" className="clearfix">
    <input
      type="text"
      placeholder="Search for products ..."
      value={value}
      onChange={onChange}
    />
  </div>
);

export default SearchField;
