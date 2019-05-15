import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Wrapper from './Wrapper';
import { updateRequest } from '../../actions/adminAction';
import { loadShops } from '../../actions/shopAction';


import '../../stylesheets/admin.scss';

class VendorRequests extends Component {
  constructor(props) {
    super(props);
    this.handleApproval = this.handleApproval.bind(this);
    this.state = {}
  }

  componentWillMount() {
    this.props.loadShops();
  }

  handleApproval(event, requestId, status) {
    status = status === 'approve' ? 'approved' : 'disapproved';
    this.props.updateRequest(requestId, status);
  }

  render() {
    const { requests, shops } = this.props;

    return (
      <Wrapper>
        <div id="vendor-requests">
          <div className="aligner">
            <div className="page-heading">
              <div>
                <span className="icon">
                  <i className="fas fa-list-alt" />
                </span>
                Vendor Requests
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-xl-9">
                <div id="requests-table">
                  { 
                    requests.map((request) => (
                      <div className="row" key={request.id}>
                        <div className="col-12 col-md-3">
                          <i className="fa fa-shopping-bag" />
                          <span>{ request.shopName }</span>
                        </div>
            
                        <div className="col-12 col-md-2">
                          <i className="fa fa-user" />
                          <span>{ request.Auth.email.split('@')[0] }</span>
                        </div>

                        <div className="col-12 col-md-4">
                          <i className="fa fa-envelope-open-text" />
                          <span>{ request.Auth.email }</span>
                        </div>
                        <div className="col-4 offset-8 col-md-3 offset-md-0">
                          { request.status == 'open' && (
                            <Fragment>
                              <button
                                type="button"
                                onClick={ (event) => this.handleApproval(event, request.id,'approve') }
                              >
                                Approve
                              </button>

                              <button
                                type="button"
                                onClick={ (event) => this.handleApproval(event, request.id, 'disapprove') }
                              >
                                Disapprove
                              </button>
                            </Fragment>
                          ) }
                          
                          { request.status == 'approved' && (
                            <span className="label approved">Approved</span>
                          ) }

                          { request.status == 'disapproved' && (
                            <span className="label">Disapproved</span>
                          ) }
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className="col-lg-3 d-none d-sm-none d-md-none d-xl-block">
                <div id="info">
                  <header>All Shops</header>

                  { !shops.length && (
                     <div>No shop has been added yet!</div>
                  ) }

                  { shops.map(shop => (
                    <div key={shop.id}>{ shop.name }</div>
                  ))}                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}


const mapStateToProps = ({ adminReducer, shopReducer }) => ({
  requests: adminReducer.requests,
  shops: shopReducer.shops
});

const mapDispatchToProps = { updateRequest,loadShops };

export default connect(mapStateToProps, mapDispatchToProps)(VendorRequests);
