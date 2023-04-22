import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionLogin } from '../redux/actions';

class Login extends Component {
  state = {
    emailLogin: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateButton);
  };

  validateButton = () => {
    const emailValidation = document.getElementById('input-email');
    const { password } = this.state;
    const minPasswordLenght = 6;
    if (emailValidation.checkValidity() && password.length >= minPasswordLenght) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  clickLogin = () => {
    const { dispatch, history } = this.props;
    const { emailLogin } = this.state;
    dispatch(actionLogin(emailLogin));
    history.push('/carteira');
  };

  render() {
    const { emailLogin, password, isDisabled } = this.state;
    return (
      <div>
        <form>
          <input
            id="input-email"
            onChange={ this.handleChange }
            name="emailLogin"
            value={ emailLogin }
            data-testid="email-input"
            type="email"
            placeholder="insira seu email"
          />
          <input
            onChange={ this.handleChange }
            name="password"
            value={ password }
            data-testid="password-input"
            type="password"
            minLength="6"
            required
            placeholder="insira sua senha"
          />
          <button
            disabled={ isDisabled }
            onClick={ this.clickLogin }
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
