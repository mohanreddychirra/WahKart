import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from '../common/ProductCard';
import '../../stylesheets/cart.scss';
import { getCartProducts } from '../../helpers';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { auth, history } = this.props;

    if (auth.role !== 'customer') {
      history.push('/');
    }
  }
  
  render() {
    const { products } = this.props;
    return (
      <div id="cart-div" className="aligner">
        <div className="row">
          <div className="col-8">
            <header>
              <span>{ products.length }</span>
              Products added to cart
            </header>

            {
              products.length === 0 && (
                <div className="mt-5">
                  There are no products in your cart
                </div>
              )
            }
            
            <div className="row">
              {
                products.map(product => (
                  <div key={product.id} className="col-4">
                    <ProductCard
                      cart
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      image={product.image}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="col-4">
            <div id="checkout-box">
              <header>
                Checkout details
              </header>

              <table className="table table-striped">
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
  }
}

const mapStateToProps = ({ productReducer, cartReducer, authReducer }) => ({
  auth: authReducer,
  products: getCartProducts(
    productReducer.products,
    cartReducer
  )
});

export default connect(mapStateToProps, null)(Cart);
