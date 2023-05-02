import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
            { expenses.map((item) => (
              <tr key={ item.id }>
                <td>{ item.description }</td>
                <td>{ item.tag }</td>
                <td>{ item.method }</td>
                <td>{ Number(item.value).toFixed(2) }</td>
                <td>{ item.exchangeRates[item.currency].name }</td>
                <td>{ Number(item.exchangeRates[item.currency].ask).toFixed(2) }</td>
                <td>
                  {
                    Number(item.value * item.exchangeRates[item.currency].ask).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>Editar/Excluir</td>
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
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
