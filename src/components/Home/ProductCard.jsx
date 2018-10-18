import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ title, price, image }) => (
  <div className="product-card">
    <img src={image} alt="product image"/>

    <div>
      <div className="title">
        { title }
      </div>

      <div className="clearfix">
         <span className="price">
          { price }
        </span>

        <Link to="#">
          <span className="cart">
            <i className="fas fa-cart-plus" />
          </span>
        </Link>
      </div>
    </div>
  </div>
);

export default ProductCard;
