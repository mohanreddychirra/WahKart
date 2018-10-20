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
  
    const { email, password, page } = this.state;

    const promise = page === 1
      ? this.props.login(email, password)
      : this.props.register(email, password)


    promise
      .then(() => {
        this.props.history.push('/');
      })
      .catch(error => {
        const message = error.response.data.message;
        this.setState({ error: message });
      });
  }

  render () {
    const { page } = this.state;

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
<<<<<<< Updated upstream
          
          <div className="fieldset">
            <label>EMAIL ADDRESS</label>
            <input
              name="email"
              type="email"
              onChange={this.onChange}
              value={this.state.email}
            />
          </div>

          <div className="fieldset">
            <label>PASSWORD</label>
            <input
              name="password"
              type="password"
              onChange={this.onChange}
              value={this.state.password}
            />
          </div>

          <button
            type="submit"
            className="form-button"
            onClick={this.onSubmit}
          >
            { page === 0 ? 'REGISTER' : 'LOGIN' }
          </button>
=======
          <form onSubmit={this.onSubmit}>
            <div className="fieldset">
              <label>EMAIL ADDRESS</label>
              <input
                name="email"
                type="email"
                onChange={this.onChange}
                value={this.state.email}
              />
            </div>

            <div className="fieldset">
              <label>PASSWORD</label>
              <input
                name="password"
                type="password"
                onChange={this.onChange}
                value={this.state.password}
              />
            </div>

            <button
              type="submit"
              className="auth-button"
            >
              { page === 0 ? 'REGISTER' : 'LOGIN' }
            </button>
          </form>
>>>>>>> Stashed changes
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
