import React, { Component } from 'react';
import { updateCustomer, getCustomer, getProductViewed } from '../../actions/customerAction';
import { connect } from 'react-redux';
import ProductList from '../common/ProductList';
import Wrapper from './Wrapper';

import '../../stylesheets/customer.scss';
class Customer extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.state = {
      status: null,
      data: {
        firstName: '',
        lastName: '',
        address: ''
      }
    }
  }

  componentWillMount() {
    this.props.getProductViewed();

    getCustomer()
      .then(customer => {
        if(customer) {
          this.setState({
            data: {
              firstName: customer.firstName,
              lastName: customer.lastName,
              address: customer.address
            }
          });
        }
      })
  }

  onChange(event) {
    const { target: { name, value }} = event;
    this.setState(prev => ({
      status: null,
      data: {
        ...prev.data,
        [name]: value
      }
    }));
  }

  onSubmit() {
    updateCustomer(this.state.data)
      .then(customer => {
        this.setState({
          status: !!customer
        });
      })
  }

  getMessage() {
    const { status } = this.state;
    if(status === null) return 'Update profile details';
    if(status) return 'User details updated successfully';
    return 'Error occured while updating details';
  }

  render() {
    const { firstName, lastName, address } = this.state.data;
    const { auth, products } = this.props;

    return (
      <Wrapper>
        <div id="customer-wrapper" className="clearfix">
          <div id="sidebar">
            <div id="customer-form">
              <p>{this.getMessage()}</p>

              <div>
                <label>First name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={this.onChange}
                />
              </div>

              <div>
                <label>Last name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={this.onChange}
                />
              </div>

              <div>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter first name"
                  value={address}
                  onChange={this.onChange}
                />
              </div>

              <button
                type="button"
                onClick={this.onSubmit}
              >
                Update
              </button>
            </div>      
          </div>
        
          <div id="content">
            <div id="product-wrapper">
              <ProductList
                auth={auth}
                products={products}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer,
  products: state.customerReducer.products
});

const mapDispatchToProps = {getProductViewed}

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
