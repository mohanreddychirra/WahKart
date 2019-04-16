import React from 'react';
import { connect } from 'react-redux';

const Overlay = ({ showOverlay }) => (
  <div
    style={{ display: `${showOverlay ? 'block' : 'none' }` }}
    id="page-overlay"
  />
);

const mapStateToProps = state => ({
  showOverlay: state.appReducer.showOverlay
});

const mapDispatchToProps = { }

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);

