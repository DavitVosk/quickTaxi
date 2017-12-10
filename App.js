import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';

import WelcomeScreen from './src/screens/Welcome';
import SignInScreen from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUp';
import MapScreen from './src/screens/MapScreen';

import firebaseConfig from './src/config/firebase';
import store from './src/store';

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    const MainNavigation = TabNavigator({
      welcome: { screen: WelcomeScreen },
      signIn: { screen: SignInScreen },
      signUp: { screen: SignUpScreen },
      map: { screen: MapScreen },
    }, {
      navigationOptions: {
        tabBarVisible: false,
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
