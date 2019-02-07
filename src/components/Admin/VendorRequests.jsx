import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Wrapper from './Wrapper';
import { updateRequest } from '../../actions/adminAction';

import '../../stylesheets/admin.scss';

class VendorRequests extends Component {
  constructor(props) {
    super(props);
    this.handleApproval = this.handleApproval.bind(this);
    this.state = {}
  }

  handleApproval(event, requestId, status) {
    status = status === 'approve' ? 'approved' : 'disapproved';
    this.props.updateRequest(requestId, status)
  }

  render() {
    const { requests } = this.props;

    return (
      <Wrapper>
        <div id="vendor-requests">
          <div className="aligner">
            <header>
              <span>
                <i className="fas fa-list-alt" />
              </span>
              Vendor Requests
            </header>

            <div id="requests-table">
              { 
                requests.map((request) => (
                  <div className="row" key={request.id}>
                    <div className="col-lg-4">
                      <i className="fa fa-user" />
                      <span>{ request.Auth.email.split('@')[0] }</span>
                    </div>
                    <div className="col-lg-4">
                      <i className="fa fa-envelope-open-text" />
                      <span>{ request.Auth.email }</span>
                    </div>
                    <div className="col-lg-4 text-center">
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
        </div>
      </Wrapper>
    );
  }
}


const mapStateToProps = ({ adminReducer }) => ({
  requests: adminReducer.requests,
});

const mapDispatchToProps = { updateRequest };

export default connect(mapStateToProps, mapDispatchToProps)(VendorRequests);
