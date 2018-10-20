import React from 'react';
import ProductCard from '../common/ProductCard';
import '../../stylesheets/cart.scss';

const Cart = () => (
  <div id="cart-div" className="aligner">
    <div className="row">
      <div className="col-8">
        <header>
          <span>3</span>
          Products added to cart
        </header>
  
        <div className="row">
          <div className="col-4">
            <ProductCard
              cart
              title="Product 1"
              price="$1500"
              image="/images/products/1.jpg"
            />
          </div>
          <div className="col-4">
            <ProductCard
              cart
              title="Product 1"
              price="$1500"
              image="/images/products/2.jpg"
            />
          </div>
          <div className="col-4">
            <ProductCard
              cart
              title="Product 1"
              price="$1500"
              image="/images/products/3.jpg"
            />
          </div>
        </div>
      </div>
      <div className="col-4">
        <div id="checkout-box">
          <header>
            Checkout details
          </header>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Product 1</td>
                <td>1</td>
                <td>$1500</td>
              </tr>

              <tr>
                <td>Product 2</td>
                <td>1</td>
                <td>$1100</td>
              </tr>

              <tr>
                <td>Product 3</td>
                <td>1</td>
                <td>$500</td>
              </tr>
            </tbody>
          </table>

          <div className="total-div">
            <span>
              Number of products
              &nbsp;&nbsp;:&nbsp;&nbsp;
              50
            </span>

            <span>
              Total checkout price
              &nbsp;&nbsp;:&nbsp;&nbsp;
              $8000
            </span>
          </div>

          <button id="checkout-btn">CHECKOUT</button>
        </div>
      </div>
    </div>
  </div>
);

export default Cart;
