import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../stylesheets/modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { modal } = this.props;

    return (
      <div id="modal" style={{ display: `${ modal.open && modal.active ? 'block' : 'none' }` }}>
        <div id="overlay" />
        <div id="content">
          {/* { modal.active === 'productFilter' && <FilterModal /> } */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modalReducer
});

export default connect(mapStateToProps, null)(Modal);
