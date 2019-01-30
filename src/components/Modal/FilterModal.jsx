import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modalAction';

class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { shops } = this.props;

    return (
      <div id="filter-modal">
        <div className="heading">
          Filter by shops
          <button
            id="done"
            type="button"
            onClick={this.props.closeModal}
          >
            Done
        </button>
        </div>

        <div id="shop-listing">
          {
            shops.map(shop => (
              <div key={shop.id} className="one-shop-listing">
                <input type="checkbox" value={shop.id} />
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
            <input type="number" placeholder="$ Min" />
            <span>-</span>
            <input type="number" placeholder="$ Max" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shops: state.shopReducer.shops
});

const mapDispatchToProps = {
  closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
