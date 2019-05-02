import React, { Component } from 'react';
import Rating from 'react-rating';

class Stars extends Component {
  constructor(props) {
    super(props);
    // this.onClick = this.onClick.bind(this);
  }

  // onClick(value) {
  //   if(this.props.clickHandler) {
  //     this.props.clickHandler(value);
  //   }
  // }

  render() {
    return (
      <div className="stargrp">
        <Rating
          {...this.props}
          start={0}
          stop={5}
          emptySymbol="far fa-star"
          fullSymbol="fas fa-star"
          fractions={2}
        />
      </div>
    );
  }
}

export default Stars;
