import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDeleteExpense } from '../redux/actions';

class Table extends Component {
  deleteClick = (id) => {
    const { dispatch } = this.props;
    dispatch(actionDeleteExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  {
                    Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                  }
                </td>
                <td>
                  {
                    Number(expense.value
                      * expense.exchangeRates[expense.currency].ask).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteClick(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
