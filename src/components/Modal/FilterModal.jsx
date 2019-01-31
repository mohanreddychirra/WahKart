import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modalAction';
import { setSearchResult } from '../../actions/productAction'; 
import {
  addFilterShopId,
  removeFilterShopId,
  setFilterMax,
  setFilterMin
} from '../../actions/modalAction';

class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.matchProduct = this.matchProduct.bind(this);
    this.state = {
      min: '',
      max: '',
    }
  }

  matchProduct(product) {
    const price = parseInt(product.price.substr(1)) || 0;
    const { filters: {min, max, shopIds } } = this.props;
    const matchShopId = shopIds.includes(product.shopId);
    let matchMinMax = false;

    if (min && max) {
      matchMinMax = price >= min && price <= max;
    }

    else if (min) {
      matchMinMax = price >= min;
    }

    else if (max) {
      matchMinMax = price <= max;
    }

    if (!shopIds.length) {
      return matchMinMax
    }
    
    if (!min && !max) {
      return matchShopId;
    }
    
    return matchShopId && matchMinMax;
  }

  handleDone() {
    const { filters: {min, max, shopIds } } = this.props;

    if (!shopIds.length && !min && !max) {
      this.props.setSearchResult(this.props.products);
    } else {
      const results = this.props.products.filter(this.matchProduct);
      this.props.setSearchResult(results);
    }

    this.props.closeModal();
  }

  handlePriceRangeChange(event) {
    let { target: { name, value } } = event;

    if (!value.match(/^[1-9][0-9]*$/)) {
      value = value.replace(/[^0-9]/gi, '');
    }
    
    this.setState({ [name]: value });
    value = parseInt(value) || null;

    if (name == 'min') {
      this.props.setFilterMin(value);
    } else {
      this.props.setFilterMax(value);
    }
  }

  handleCheckboxClick(event, id) {
    const { target } = event;

    if (target.checked) {
      this.props.addFilterShopId(id);
    } else {
      this.props.removeFilterShopId(id);
    }
  }

  render() {
    const { shops, filters: { shopIds, min, max } } = this.props;

    return (
      <div id="filter-modal">
        <div className="heading">
          Filter by shops
          <button
            id="done"
            type="button"
            onClick={this.handleDone}
          >
            Done
        </button>
        </div>

        <div id="shop-listing">
          {
            shops.map(shop => (
              <div key={shop.id} className="one-shop-listing">
                <input
                  onClick={(event) => this.handleCheckboxClick(event, shop.id)}
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shops: state.shopReducer.shops,
  products: state.productReducer.products,
  filters: state.modalReducer.productFilter
});

const mapDispatchToProps = {
  closeModal,
  addFilterShopId,
  removeFilterShopId,
  setFilterMax,
  setFilterMin,
  setSearchResult
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
