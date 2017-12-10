import * as aT from '../actions/types';

const INITIAL_STATE = {
  user: '',
  signInError: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case aT.SIGN_IN_SUCCESS:
      return { ...INITIAL_STATE, user: action.payload };
    case aT.SIGN_IN_FAIL:
      return { ...INITIAL_STATE, signInError: action.payload };
  }
  return state;
}