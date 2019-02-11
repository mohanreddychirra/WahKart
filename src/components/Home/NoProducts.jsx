import React from 'react';
import { Link } from 'react-router-dom'; 

const NoProducts = ({ role }) => (
  <div id="no-product">
    <i className="fas fa-spinner" />
    There are no products at this time
    <div>
      { role === 'vendor' && (
        <Link to="/product/add">
          <button type="button">
            Add Product
          </button>
        </Link>
      )}
    </div>
  </div>
);

export default NoProducts;
