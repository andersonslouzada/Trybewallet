import fetchAPI from '../../services/fetchAPI';

export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ACTION_FETCH_CURRENCIES = 'ACTION_FETCH_CURRENCIES';
export const ACTION_CLICKBUTTON = 'ACTION_CLICKBUTTON';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const FINISH_EDIT_EXPENSE = 'FINISH_EDIT_EXPENSE';

export const actionLogin = (payload) => ({
  type: ACTION_LOGIN,
  payload,
});

export const actionCurrency = (payload) => ({
  type: ACTION_FETCH_CURRENCIES,
  payload,
});

export const actionClickButton = (payload) => ({
  type: ACTION_CLICKBUTTON,
  payload,
});

export const clickFetchAPI = (getState) => async (dispatch) => {
  const data = await fetchAPI();
  delete data.USDT;
  const expenses = {
    ...getState,
    exchangeRates: data,
  };
  dispatch(actionClickButton(expenses));
};

export const actionDeleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const actionEditExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const actionFinishEdit = (payload) => ({
  type: FINISH_EDIT_EXPENSE,
  payload,
});
