import React, { Component } from 'react';
import toastr from 'toastr';
import paystack from '../../paystack';
import history from '../../history';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.getPrice = this.getPrice.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.updateCheckout = this.updateCheckout.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.paymentComplete = this.paymentComplete.bind(this);

    this.state = {
      quantities: {},
      totals: {}
    }
  }

  componentWillMount() {
    this.updateCheckout(this.props.products);
  }

  updateCheckout(products) {
    const totals = {};
    const quantities = {};
  
    products.forEach(product => {
      const price = this.getPrice(product);
      totals[`p_${product.id}`] = price;
      quantities[`p_${product.id}`] = 1;
    });

    this.setState({ totals, quantities });
  }

  getPrice(product) {
    const price = product.price;
    return parseInt(price) || 0;
  }

  getTotalPrice() {
    const { totals } = this.state;
    return Object.values(totals).reduce((prev, next) => (prev + next), 0);
  }
  
  paymentComplete() {
    const { quantities, totals } = this.state;

    const products = Object.keys(quantities).map(key => {
      const productId = parseInt(key.substr(2)) || null;

      return {
        productId,
        quantity: quantities[key],
        price: `$${totals[key]}`
      };
    });

    const order = {
      amount: `$${this.getTotalPrice()}`,
      products
    }

    this.props.addOrderToHistory(order);
    this.props.clearCartItems();
    history.push('/orders');
  }

  handleCheckout() {
    const { totals, quantities } = this.state;
    const keys = Object.keys(quantities);
    const check = !keys.some(key => (!quantities[key] || !totals[key]));
    
    if (!check) {
      toastr.error('Ensure to fill all necessary fields');
    } else {
      const amount = this.getTotalPrice();
      paystack(amount * 100, this.paymentComplete).openIframe();
    }
  }

  shouldComponentUpdate(nextProps) {
    const { products: oldProducts } = this.props;
    const { products: newProducts } = nextProps;

    if (oldProducts && newProducts) {
      if (oldProducts.length !== newProducts.length) {
        this.updateCheckout(newProducts);
      }
    }
  
    return true;
  }

  handleQuantityChange(event) {
    let { target: { name: id, value } } = event;
    const { products } = this.props;

    if (!value.match(/^[1-9][0-9]*$/)) {
      value = value.replace(/[^0-9]/gi, '');
    }
    
    value = parseInt(value) || 0;

    const item = products.find(i => i.id == id);
    const price = this.getPrice(item) * value;

    this.setState(({ totals, quantities }) => ({
      totals: {
        ...totals,
        [`p_${id}`]: price
      },
      quantities: {
        ...quantities,
        [`p_${id}`]: value
      }
    }));
  }

  render() {
    const { products } = this.props;
    const { quantities, totals } = this.state;

    return (
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
            {
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>
                    <input
                      type="text"
                      name={product.id}
                      value={quantities[`p_${product.id}`] || ''}
                      onChange={this.handleQuantityChange}
                    />
                  </td>
                  <td>{`$${totals[`p_${product.id}`]}`}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <div className="total-div">
          <span>
            Total checkout price
            &nbsp;&nbsp;:&nbsp;&nbsp;
            ${this.getTotalPrice()}
          </span>
        </div>

        <button id="checkout-btn" onClick={this.handleCheckout}>CHECKOUT</button>
      </div>
    );
  }
}

export default Checkout;
