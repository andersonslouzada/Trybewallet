import { ACTION_LOGIN } from '../actions';

const initialState = {
  email: '',
};

export const user = (state = initialState, { type, payload }) => {
  switch (type) {
  case ACTION_LOGIN:
    return {
      ...state,
      email: payload,
    };
  default:
    return state;
  }
};
