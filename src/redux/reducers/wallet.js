import { ACTION_FETCH_CURRENCIES, ACTION_CLICKBUTTON } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ACTION_FETCH_CURRENCIES:
    return {
      ...state,
      currencies: payload,
    };
  case ACTION_CLICKBUTTON:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        value: payload.value,
        description: payload.description,
        currency: payload.currency,
        method: payload.method,
        tag: payload.tag,
        exchangeRates: payload.exchangeRates,
      }],
    };
  default:
    return state;
  }
};
