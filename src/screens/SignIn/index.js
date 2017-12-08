import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Content } from 'native-base';

import Header from '../../components/header';

class SignInScreen extends Component {

  render() {
    return (
      <Container style={styles.container}>
       <Header
         {...this.props}
         title='Sign In'
         left='arrow-back'
         leftPress={()=>this.props.navigation.goBack()}
       />

        <Content>
          <Text>
            This is Content Section
          </Text>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {}
};

export default SignInScreen;
