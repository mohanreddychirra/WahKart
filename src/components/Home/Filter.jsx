import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setHomeCategoryId,
  setHomeSearchQuery,
  getHomeProducts,
  setHomeFilter,
  setFilterApplied
} from '../../actions/homeAction';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleShopClick = this.handleShopClick.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
  }
  
  handleFilter(e, page = 1) {
    const { homeCategoryId } = this.props;
    const { filter } = this.props;
    this.props.setFilterApplied(true);
    this.props.getHomeProducts(homeCategoryId, '', page, filter);
  }

  handleClearFilter() {
    const { homeCategoryId } = this.props;
    const filter = { min: '', max: '', shopIds: [] }
    this.props.setFilterApplied(false);
    this.props.setHomeFilter(filter); 
    this.props.getHomeProducts(homeCategoryId, '', 1, filter);
  }

  handlePriceChange(event) {
    const { target: { name, value }} = event;
    const { filter } = this.props;
    this.props.setHomeFilter({ ...filter, [name]: value }); 
  }

  handleShopClick(event, id) {
    const { shopIds, min, max } = this.props.filter;
    const { checked } = event.target;
    let newShopIds = [...shopIds];

    if (checked) { newShopIds.push(id); }
    else { newShopIds = newShopIds.filter(shopId => `${shopId}` !== `${id}`); }

    this.props.setHomeFilter({ shopIds: newShopIds, min, max }); 
  }

  render() {
    const { shops, filterApplied, filter: { min, max, shopIds }} = this.props;
  
    return ( 
      <div id="filter">
        <div className="heading">
          Filter by shops
          <button
            type="button"
            onClick={this.handleFilter}
          >
            Go
          </button>

          { filterApplied && (
            <button
              type="button"
              onClick={this.handleClearFilter}
            >
              X
            </button>
          ) }
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
              placeholder="Min"
              name="min"
              value={min}
              onChange={this.handlePriceChange}
            />
            <span>-</span>
            <input
              type="text"
              placeholder="Max"
              name="max"
              value={max}
              onChange={this.handlePriceChange}
            />
          </div>
        </div>
      
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  homeCategoryId: state.homeReducer.homeCategoryId,
  filterApplied: state.homeReducer.filterApplied,
  filter: state.homeReducer.filter,
  shops: state.shopReducer.shops
});

const mapDispatchToProps = {
  setHomeCategoryId,
  getHomeProducts,
  setHomeSearchQuery,
  setHomeFilter,
  setFilterApplied
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
