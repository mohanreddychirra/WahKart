import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from '../common/ProductCard';
import '../../stylesheets/cart.scss';
import { getCartProducts } from '../../helpers';
import Checkout from './Checkout';

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
            { !!products.length && (
                <Checkout
                products={products}
                />
              )
            }
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
