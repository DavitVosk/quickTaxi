import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import WelcomeScreen from './src/screens/Welcome';
import SignInScreen from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUp';


export default class App extends React.Component {
  render() {
    const MainNavigation = TabNavigator({
      welcome: { screen: WelcomeScreen },
      signIn: { screen: SignInScreen },
      signUp: { screen: SignUpScreen },
    }, {
      navigationOptions: {
        tabBarVisible: false,
      }
    });

    return (
      <View style={styles.container}>
        <MainNavigation />
      </View>
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
