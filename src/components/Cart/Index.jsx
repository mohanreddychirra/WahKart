import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from '../common/ProductCard';
import '../../stylesheets/cart.scss';
import { getCartProducts } from '../../helpers';
import Checkout from './Checkout';
import { clearCartItems } from '../../actions/cartAction';
import { addOrderToHistory } from '../../actions/orderAction';
import { loadProducts } from '../../actions/productAction';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.loadProducts();
  }

  shouldComponentUpdate(nextProps) {
    const { auth, history } = this.props;
    const { auth: nextAuth } = nextProps;

    if (nextAuth.noLogin) {
      history.push('/');
      return false;
    }

    if (auth.inProgress === true && nextAuth.inProgress === false) {
      if (nextAuth.role !== 'customer') {
        history.push('/');
        return false;
      }
    }

    return true;
  }

  render() {
    const { products } = this.props;

    return (
      <div id="cart-div" className="aligner">
        <div className="row">
          <div className="col-12 col-xl-8">
            <header className="head">
              <span>{ products.length }</span>
              Products added to cart
            </header>

            {
              products.length === 0 && (
                <div className="empty mt-5">
                  There are no products in your cart
                </div>
              )
            }
            
            <div className="row">
              {
                products.map(product => (
                  <div key={product.id} className="col-xs-12 col-sm-6 col-lg-4 col-xl-4 text-center">
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
          <div className="col-12 col-xl-4">
            { !!products.length && (
                <Checkout
                  products={products}
                  addOrderToHistory={this.props.addOrderToHistory}
                  clearCartItems={this.props.clearCartItems}
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

const mapDispatchToProps = { addOrderToHistory, clearCartItems, loadProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
