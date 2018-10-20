import React, { Component} from 'react';
import '../../stylesheets/product.scss'

class ManageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }
  }

  render() {
    const { page } = this.state;

    return (
      <div id="manage-product">
        <div className="form-box">
          <div className="heading">
            <i className="fas fa-edit mr-3" />
            { page === 1 ? 'Edit' : 'Add new' } product
          </div>

          <div className="status-div">
            Please provide required details
          </div>

          <div className="fieldset">
            <label>Title</label>
            <input
              name="title"
              type="title"
            />
          </div>

          <div className="fieldset">
            <label>Price</label>
            <input
              name="title"
              type="title"
            />
          </div>

          <div className="fieldset">
            <label>Image URL</label>
            <input
              name="title"
              type="title"
            />
          </div>

          <button
            type="submit"
            className="form-button"
          >
            { page === 1 ? 'UPDATE' : 'ADD PRODUCT' }
          </button>
        </div>
      </div>
    );
  }
}

export default ManageProduct;
