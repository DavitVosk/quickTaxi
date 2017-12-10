import * as aT from '../../actions/types';
import * as firebase from 'firebase';

export const signIn = (email, password) => {
  return async dispatch => {
    try{
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: aT.SIGN_IN_SUCCESS, payload: email });
    }
    catch(e) {
      dispatch({ type: aT.SIGN_IN_FAIL, payload: e.message });
    }
  }
};
