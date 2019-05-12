import React, { Component, Fragment } from 'react';
import { homePath } from '../../utils';
import history from '../../history';
import { connect } from 'react-redux';

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  /**
   * 
   * @description Handles page access via link
   * 
   * @param {*} nextProps 
   */
  componentWillMount() {
    const { auth: { role, inProgress, noLogin } } = this.props;
    
    if(!inProgress) {
      if (noLogin || role != 'vendor') {
        history.push(homePath(role));
      }
    }
  }

  /**
   * 
   * @description Handles when page is reloaded
   * 
   * @param {*} nextProps 
   */
  shouldComponentUpdate(nextProps) {
    const { auth } = this.props;
    const { auth: nextAuth } = nextProps;
    
    if (nextAuth.noLogin) {
      history.push('/');
      return false;
    }

    if (auth.inProgress === true && nextAuth.inProgress === false) {
      if (nextAuth.role !== 'vendor') {
        history.push(homePath(nextAuth.role));
        return false;
      }
    }
    
    return true;
  }

  render() {
    return (
      <div id="vendor-wrapper">
        <Fragment>
          { this.props.children }
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = ({ authReducer }) => ({
  auth: authReducer,
});

export default connect(mapStateToProps, null)(Wrapper);
