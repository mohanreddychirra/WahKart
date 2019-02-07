import React, { Component } from 'react';

import '../../stylesheets/admin.scss';

class VendorRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
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
              [1,2,3,4,5].map((vendor) => (
                <div className="row">
                  <div className="col-lg-4">
                    <i className="fa fa-user" />
                    <span>Customer</span>
                  </div>
                  <div className="col-lg-4">
                    <i className="fa fa-envelope-open-text" />
                    <span>customer@gmail.com</span>
                  </div>
                  <div className="col-lg-4 text-center">
                    <button>Approve</button>
                    <button>Disapprove</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default VendorRequests;
