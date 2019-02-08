import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Wrapper from './Wrapper';

class Vendor extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { request } = this.props;

    return (
      <Wrapper>
        { request && (
          <div className="text-center">
            Vendor Dashboard <br />

            { request.status === 'open' && (
              <div>Your request has been sent and awaitinng approval</div>
            ) }

            { request.status === 'approved' && (
              <div>
                Your request has been approved and shop created &nbsp;
                <Link to="/">Go to Shop</Link> 
              </div>
            ) }

            { request.status === 'disapproved' && (
              <div>Your request disapproved</div>
            ) }
          </div>
        )}
      </Wrapper>
    );
  }
}


const mapStateToProps = ({ vendorReducer }) => ({
  request: vendorReducer.request
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);
