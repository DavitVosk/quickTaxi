import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import { Button } from 'native-base';

class ButtonGroup extends Component {
  render() {
    return (
      <Animated.View style={[styles.container, {...this.props.style}] }>
        <Button full style={styles.button}
          onPress={() => this.props.navigation.navigate('signIn')}
        >
          <Text>Sign In</Text>
        </Button>

        <Button full style={styles.button}
          onPress={() => this.props.navigation.navigate('signUp')}
        >
          <Text>Sign Up</Text>
        </Button>
      </Animated.View>
    );
  }
}

const styles = {
  container: {
    marginTop: 50,
    alignSelf: 'stretch',
    marginHorizontal: 20
  },
  button: {
    justifyContent: 'center',
    marginBottom: 20,}
};

export default ButtonGroup;
