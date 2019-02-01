import React, { Component } from 'react';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.getPrice = this.getPrice.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.state = {
      items: [ ...props.products ],
      quantities: {},
      totals: {}
    }
  }

  getTotalPrice() {
    const { totals } = this.state;
    return Object.values(totals).reduce((prev, next) => (prev + next), 0);
  }

  handleQuantityChange(event) {
    let { target: { name: id, value } } = event;
    
    if (!value.match(/^[1-9][0-9]*$/)) {
      value = value.replace(/[^0-9]/gi, '');
    }
    
    value = parseInt(value) || 0;
    const item = this.state.items.find(i => i.id == id);
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
    const { items, quantities, totals } = this.state;
 
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
              items.map(product => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>
                    <input
                      type="text"
                      name={product.id}
                      value={
                        quantities[`p_${product.id}`]
                          ? quantities[`p_${product.id}`]
                          : ''
                      }
                      onChange={this.handleQuantityChange}
                    />
                  </td>
                  <td>{`$${
                    totals[`p_${product.id}`]
                      ? totals[`p_${product.id}`]
                      : '0'
                  }`}</td>
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
