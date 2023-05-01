import { ACTION_FETCH } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

export const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ACTION_FETCH:
    return {
      ...state,
      currencies: payload,
    };
  default:
    return state;
  }
};
