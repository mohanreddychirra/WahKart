import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/auth.scss';

const Auth = () => (
  <div id="auth">
    <div id="auth-box">
      <div id="tabs" className="clearfix">
        <Link to="/register">
          <div className="tab active">REGISTER</div>
        </Link>

        <Link to="/login">
          <div className="tab">LOGIN</div>
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
        REGISTER
      </button>
    </div>
  </div>
);

export default Auth;
