import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ auth, title, price, image }) => (
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

        {
          auth.role === 'customer' && (
            <Link to="#">
              <span className="cart">
                <i className="fas fa-cart-plus" />
              </span>
            </Link>
          )
        }

        {
          auth.role === 'vendor' && (
            <Link to="#">
              <span className="cart">
                <i className="fas fa-edit" />
              </span>
            </Link>
          )
        }
      </div>
    </div>
  </div>
);

export default ProductCard;
