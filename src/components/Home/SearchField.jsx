import React from 'react';

const SearchField = ({ value, onChange, openFilterModal }) => (
  <div id="search-field" className="clearfix">
    <input
      type="text"
      placeholder="Search for products ..."
      value={value}
      onChange={onChange}
    />

    <button
      type="button"
      onClick={openFilterModal}
    >
      Filter
    </button>
  </div>
);

export default SearchField;
