import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleCurrencies from '../services/handleDataAPI';
import { actionCurrency, clickFetchAPI } from '../redux/actions';

class WalletForm extends Component {
  state = {
    currenciesCoins: [],
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const data = await handleCurrencies();
    this.setState({ currenciesCoins: [...data] });
    dispatch(actionCurrency(data));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const getState = {
      value,
      description,
      currency,
      method,
      tag,
    };
    console.log(getState);
    dispatch(clickFetchAPI(getState));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, description, currency, method, tag, currenciesCoins } = this.state;
    return (
      <div>
        <input
          data-testid="value-input"
          value={ value }
          name="value"
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
          {currenciesCoins.map((item, i) => (
            <option
              key={ i }
              value={ item }
            >
              { item }
            </option>))}
        </select>
        <select
          htmlFor="method"
          id="method"
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          htmlFor="tag"
          id="tag"
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });

export default connect(mapStateToProps)(WalletForm);
