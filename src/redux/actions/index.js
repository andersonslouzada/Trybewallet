export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ACTION_FETCH = 'ACTION_FETCH';

export const actionLogin = (payload) => ({
  type: ACTION_LOGIN,
  payload,
});

export const actionFetch = (payload) => ({
  type: ACTION_FETCH,
  payload,
});
