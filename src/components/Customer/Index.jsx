import React, { Component } from 'react';
import { updateCustomer, getCustomer } from '../../actions/CustomerAction';

import '../../stylesheets/customer.scss';
import Wrapper from './Wrapper';

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

    return (
      <Wrapper>
        <div id="customer">
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
      </Wrapper>
    );
  }
}

export default Customer;
