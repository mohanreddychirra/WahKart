import React from 'react';

const SearchField = ({ value, onChange, onVendorFilterChange, shops, shopFilter }) => (
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
      value={shopFilter ? shopFilter : ''}
    >
      <option value="">-- Select --</option>
      {
        shops.map(shop => (
          <option key={shop.id} value={shop.id}>{shop.name}</option>
        ))
      }
    </select>
  </div>
);

export default SearchField;
