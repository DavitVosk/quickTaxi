import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';

class ButtonGroup extends Component {
  render() {
    return (
      this.props.buttons.map(btn => {
        return (
          <Button
            key={btn.title}
            full
            style={styles.button}
            onPress={btn.navitageTo}
          >
            <Text style={styles.text}>{btn.title}</Text>
          </Button>
        )
      })
    );
  }
}

const styles = {
  button: {
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#F6B01A'
  },
  text: {
    color: 'white',
    fontSize: 17
  }
};

export default ButtonGroup;
