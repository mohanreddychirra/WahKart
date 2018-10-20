import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ auth, cart, title, price, image }) => (
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
          auth && auth.role === 'customer' && (
            <Link to="#">
              <span className="cart">
                <i className="fas fa-cart-plus" />
              </span>
            </Link>
          )
        }

        {
          cart && (
            <Link to="#">
              <span className="cart">
                <i className="fas fa-trash" />
              </span>
            </Link>
          )
        }

        {
          auth && auth.role === 'vendor' && (
            <Fragment>
              <Link to="#">
                <span className="cart ml-3">
                  <i className="fas fa-trash" />
                </span>
              </Link>

              <Link to="#">
                <span className="cart">
                  <i className="fas fa-edit" />
                </span>
              </Link>
            </Fragment>
          )
        }
      </div>
    </div>
  </div>
);

export default ProductCard;
