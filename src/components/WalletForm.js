import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleCurrencies from '../services/handleDataAPI';
import { actionCurrency, clickFetchAPI, actionFinishEdit } from '../redux/actions';

const food = 'Alimentação';

class WalletForm extends Component {
  state = {
    currenciesCoins: [],
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: food,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const data = await handleCurrencies();
    this.setState({ currenciesCoins: [...data] });
    dispatch(actionCurrency(data));
  }

  componentDidUpdate(prevProps) {
    const { isEditing, expenseToEdit, expenses } = this.props;
    if (prevProps.isEditing !== isEditing && isEditing === true) {
      this.setState({
        value: expenses[expenseToEdit].value,
        description: expenses[expenseToEdit].description,
        currency: expenses[expenseToEdit].currency,
        method: expenses[expenseToEdit].method,
        tag: expenses[expenseToEdit].tag,
      });
    }
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
    dispatch(clickFetchAPI(getState));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: food,
    });
  };

  editExpenseClick = () => {
    const { expenses, expenseToEdit, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const payload = [
      ...expenses,
    ];
    payload[expenseToEdit] = {
      ...expenses[expenseToEdit],
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(actionFinishEdit(payload));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: food,
    });
  };

  render() {
    const { value, description, currency, method, tag, currenciesCoins } = this.state;
    const { isEditing } = this.props;
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
        {!isEditing
          ? (
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          )
          : (
            <button
              type="button"
              onClick={ this.editExpenseClick }
            >
              Editar despesa
            </button>
          )}
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  expenseToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      USD: PropTypes.shape({
        name: PropTypes.string.isRequired,
        ask: PropTypes.string.isRequired,
        bid: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        create_date: PropTypes.string.isRequired,
        high: PropTypes.string.isRequired,
        low: PropTypes.string.isRequired,
      }),
    }),
  })).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expenseToEdit: state.wallet.expenseToEdit,
  isEditing: state.wallet.isEditing,
});

export default connect(mapStateToProps)(WalletForm);
