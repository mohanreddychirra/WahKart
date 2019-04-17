import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, register } from '../../actions/authAction';
import '../../stylesheets/auth.scss';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.setPage = this.setPage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  
    this.state = {
      page: null,
      email: '',
      password: '',
      shopName: '',
      role: '',
      error: null
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

  onChange(event) {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value,
      error: null
    });
  }

  onSubmit(event) {
    event.preventDefault();
  
    const { email, password, role, page, shopName } = this.state;

    const promise = page === 1
      ? this.props.login(email, password)
      : this.props.register(email, password, role, shopName)

    promise
      .catch(error => {
        console.log(error);
        const message = error.response.data.message;
        this.setState({ error: message });
      });
  }

  render () {
    const { page, role } = this.state;

    return (
      <div id="auth">
        <div id="auth-box" className="form-box">
          <div className="tabs clearfix">
            <Link to="/register">
              <div className={`tab ${page === 0 && 'active'}`}>REGISTER</div>
            </Link>

            <Link to="/login">
              <div className={`tab ${page === 1 && 'active'}`}>LOGIN</div>
            </Link>
          </div>

          <div className={`status-div ${ this.state.error && 'error'}`}>
            {
              this.state.error
                ? this.state.error
                : 'Please provide required details'
            }
          </div>

          <form onSubmit={this.onSubmit}>
            { page === 0 && (
              <div className="fieldset">
                <label>Account Type</label>
                <select
                  name="role"
                  required
                  onChange={this.onChange}
                  value={this.state.role}
                >
                  <option value="">-- Select --</option>
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
            )}
            
            { page === 0 && role === 'vendor' && (
              <div className="fieldset">
                <label>SHOP NAME</label>
                <input
                  name="shopName"
                  required
                  type="text"
                  onChange={this.onChange}
                  value={this.state.shopName}
                />
              </div>
            )}

            <div className="fieldset">
              <label>EMAIL ADDRESS</label>
              <input
                name="email"
                required
                type="email"
                onChange={this.onChange}
                value={this.state.email}
              />
            </div>

            <div className="fieldset">
              <label>PASSWORD</label>
              <input
                name="password"
                required
                type="password"
                onChange={this.onChange}
                value={this.state.password}
              />
            </div>

            <button
              type="submit"
              className="form-button"
            >
              { page === 0 ? 'REGISTER' : 'LOGIN' }
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  login,
  register
};


export default connect(null, mapDispatchToProps)(Auth);
