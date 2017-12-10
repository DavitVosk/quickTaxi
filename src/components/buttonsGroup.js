import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';

class ButtonGroup extends Component {
  render() {
    return (
      this.props.buttons.map(btn => {
        return(
          <Button
            key={btn.title}
            full
            style={styles.button}
            onPress={btn.navitageTo}
          >
            <Text>{btn.title}</Text>
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
  }
};

export default ButtonGroup;
