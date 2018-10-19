import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/auth.scss';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.setPage = this.setPage.bind(this);

    this.state = {
      page: null
    }
  }

  componentWillMount() {
    this.setPage(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setPage(nextProps);
  }

  setPage(props) {
    const { match: { path } } = props;
    const page = path === '/register' ? 0 : 1;
    this.setState({ page });
  }

  render () {
    const { page } = this.state;

    return (
      <div id="auth">
        <div id="auth-box">
          <div id="tabs" className="clearfix">
            <Link to="/register">
              <div className={`tab ${page === 0 && 'active'}`}>REGISTER</div>
            </Link>

            <Link to="/login">
              <div className={`tab ${page === 1 && 'active'}`}>LOGIN</div>
            </Link>
          </div>

          <div className="status-div">
            Please provide required details
          </div>
          <div className="fieldset">
            <label>EMAIL ADDRESS</label>
            <input type="text" />
          </div>

          <div className="fieldset">
            <label>PASSWORD</label>
            <input type="text" />
          </div>

          <button type="submit" className="auth-button">
            { page === 0 ? 'REGISTER' : 'LOGIN' }
          </button>
        </div>
      </div>
    );
  }
}

export default Auth;
