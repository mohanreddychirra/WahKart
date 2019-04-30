import React, { Component } from 'react';

class Star extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }

  render() {
    return (
      <div className="star-pair clearfix">
        <button type="button">
          <i className="fas fa-star-half" />
        </button>

        <button type="button">
          <i className="fas fa-star-half" />
        </button>
      </div>
    );
  }
}

export default Star;
