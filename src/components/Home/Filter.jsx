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

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: '',
      max: '',
    }
  }

  render() {
    const { shops, shopIds } = this.props;
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
                  onClick={() => this.handleShopClick(shop.id)}
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
            <button type="button" onClick={() => this.handlePriceRangeSet(min, max)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
