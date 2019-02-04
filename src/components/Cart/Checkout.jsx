import React, { Component } from 'react';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.getPrice = this.getPrice.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.updateCheckout = this.updateCheckout.bind(this);
    this.state = {
      quantities: {},
      totals: {}
    }
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

  componentWillMount() {
    this.updateCheckout(this.props.products);
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

  getTotalPrice() {
    const { totals } = this.state;
    return Object.values(totals).reduce((prev, next) => (prev + next), 0);
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

  getPrice(product) {
    const price = product.price.substr(1).trim();
    return parseInt(price) || 0;
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

        <button id="checkout-btn">CHECKOUT</button>
      </div>
    );
  }
}

export default Checkout;
