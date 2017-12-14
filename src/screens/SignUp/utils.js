import firebase from 'firebase';

export const signUp = async ({ email, username, password }) => {
  try {
    var user = await firebase.auth().createUserWithEmailAndPassword(email, password);

    const ref = firebase.database().ref().child('user');
    const data = {
      email,
      password,
      username,
      id: user.uid
    };

    //use 'child' and 'set' combination to save data in your own generated key
    return ref.child(user.uid).set(data)
      .then((ref) => {
        return { signedUp: true, message: 'Successfully signed up' }
      }, (error) => {
        console.log(error);
        return { signedUp: true, errorMessage: 'Something wrong occurred' };
      });
  } catch (e) {
    console.log('signUp issue', e);
    return { signedUp: false, message: e.message }
  }
}