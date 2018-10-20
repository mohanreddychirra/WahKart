import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addToCart, deleteFromCart } from '../../actions/cartAction';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  constructor(props){
    super(props);
    this.state = {}
    this.addToCartHandler = this.addToCartHandler.bind(this);
    this.deleteFromCartHandler = this.deleteFromCartHandler.bind(this);
  }

  addToCartHandler(id) {
    this.props.addToCart(id);
  }

  deleteFromCartHandler(productId) {
    console.log(productId);
    this.props.deleteFromCart(productId);
  }

  render() {
    const { auth, cart, inCart, id, title, price, image } = this.props;

    return (
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
              auth && auth.role === 'customer' && !inCart && (
                <Link to="#" onClick={() => this.addToCartHandler(id)}>
                  <span className="cart">
                    <i className="fas fa-cart-plus" />
                  </span>
                </Link>
              )
            }

            {
              cart && (
                <Link to="#" onClick={() => this.deleteFromCartHandler(id)}>
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
  }
}

const mapStateToProps = ({ cartReducer }, ownProps) => ({
  inCart: cartReducer.some(cartItem => cartItem.productId === ownProps.id)
});

const mapDispatchToProps = {
  addToCart,
  deleteFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
