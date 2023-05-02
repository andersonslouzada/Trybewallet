import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{`Email ${email}`}</p>
        <p data-testid="total-field">
          {expenses.reduce((acc, item) => acc + (Number(item
            .value) * Number(item.exchangeRates[item.currency].ask)), 0).toFixed(2)}
        </p>
        <p data-testid="header-currency-field">BRL</p>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
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
