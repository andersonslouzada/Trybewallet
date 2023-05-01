import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import currenciesArray from '../services';
import { actionFetch } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenses: '',
    description: '',
    currency: 'USD',
    payment: 'Dinheiro',
    category: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const data = await currenciesArray();
    dispatch(actionFetch(data));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { expenses, description, currency, payment, category } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <input
          data-testid="value-input"
          value={ expenses }
          name="expenses"
          type="number"
          onChange={ this.handleChange }
          placeholder="Insira o valor gasto"
        />
        <input
          data-testid="description-input"
          value={ description }
          name="description"
          type="text"
          onChange={ this.handleChange }
          placeholder="descreva o gasto"
        />
        <select
          data-testid="currency-input"
          htmlFor="currency"
          id="currency"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((item, i) => (
            <option
              key={ i }
              value={ item }
            >
              { item }
            </option>))}
        </select>
        <select
          htmlFor="payment"
          id="payment"
          name="payment"
          value={ payment }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          htmlFor="category"
          id="category"
          name="category"
          value={ category }
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });

export default connect(mapStateToProps)(WalletForm);
