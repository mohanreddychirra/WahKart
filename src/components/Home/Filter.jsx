import React, { Component } from 'react';
import { connect } from 'react-redux';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this);
    this.handleShopClick = this.handleShopClick.bind(this);

    this.state = {
      min: '',
      max: '',
    }
  }

  handlePriceRangeChange(event) {
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
  }

  handleShopClick(event, id) {
    this.props.handleShopClick(
      id, event.target.checked
    );
  }

  render() {
    const { shops, shopIds, handlePriceRangeSet } = this.props;
    const { min, max } = this.state;

    return (
      <div id="filter">
        <div className="heading">
          Filter by shops
        </div>

        <div id="shop-listing">
          {
            shops.map(shop => (
              <div key={shop.id} className="one-shop-listing">
                <input
                  onClick={e => this.handleShopClick(e, shop.id)}
                  type="checkbox"
                  onChange={ () => null }
                  checked={ shopIds.includes(shop.id) }
                />
                <span>{shop.name}</span>
              </div>
            ))
          }
          
        </div>

        <div className="heading">
          Filter by price range
        </div>

        <div id="price-filter">
          <div id="aligner" className="clearfix">
            <input
              type="text"
              placeholder="$ Min"
              name="min"
              value={min ? min : this.state.min}
              onChange={this.handlePriceRangeChange}
            />
            <span>-</span>
            <input
              type="text"
              placeholder="$ Max"
              name="max"
              value={max ? max : this.state.max}
              onChange={this.handlePriceRangeChange}
            />
            <button type="button" onClick={() => handlePriceRangeSet(min, max)}>
              Set
            </button>
          </div>
        </div>
      
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shops: state.shopReducer.shops,
});

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
