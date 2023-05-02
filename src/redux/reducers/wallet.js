import {
  ACTION_FETCH_CURRENCIES,
  ACTION_CLICKBUTTON,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  FINISH_EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditing: false,
  expenseToEdit: 0,
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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== payload)],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      isEditing: true,
      expenseToEdit: payload,
    };
  case FINISH_EDIT_EXPENSE:
    return {
      ...state,
      expenses: payload,
      isEditing: false,
      expenseToEdit: 0,
    };
  default:
    return state;
  }
};
