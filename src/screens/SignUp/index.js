import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Container, Content, Form, Button, Icon } from 'native-base';

import Header from '../../components/header';
import * as validate from '../../utils/validation/validation';
import styles from './styles';
import { signUp } from './utils';
import Input from '../../components/input';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      email: '',
      username: '',
      password: '',
      rePassword: '',
      emailError: '',
      passwordError: '',
      rePasswordError: ''
    };
    this.state = this.initialState
  }

  validateInputs = () => {
    this.setState({ emailError: '', passwordError: '', rePasswordError: '' });
    const { email, password, rePassword, username } = this.state;

    //validate email
    const validate_email = validate.validate_email(email);
    if (! validate_email) {
      this.setState({ emailError: `${email} email is not a valid` })
    }

    // validate password
    const validate_password = validate.validate_password(password);
    if (! validate_password) {
      this.setState({ passwordError: 'your password must contain between 6 and 60 characters' })
    }

    // validate password confirmation
    const validate_rePassword = validate.validate_password_confirmation(password, rePassword);
    if (! validate_rePassword) {
      this.setState({ rePasswordError: 'passwords must be matched' })
    }

    validate_email &&
    validate_password &&
    validate_rePassword &&
    signUp({ email, username, password })
      .then((res) => {
        // good! just signed up a new user
        if (res.signedUp === true) {
          console.log('registered',);
          this.props.navigation.navigate('map')
        } else {
          // display error message
          Alert.alert(res.message)
        }

      });
  };

  render() {
    return (
      <Container>
        <Header title='Sign Up'
                left='arrow-back'
                leftPress={() => {
                  this.props.navigation.goBack();
                  this.setState({ ...this.initialState })
                }}
        />

        <Content keyboardShouldPersistTaps='always'
                 contentContainerStyle={styles.content}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='ios-car-outline' style={styles.icon} />
            <Text style={styles.text}>Quick Taxi APP</Text>
          </View>

          <View style={{ flex: 2 }}>
            <Form>
              <Input
                label='Email'
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text, emailError: '' })}
              />
              <Text style={styles.errorMessage}>{this.state.emailError}</Text>

              <Input
                label='Username'
                value={this.state.username}
                onChangeText={(text) => this.setState({ username: text })}
              />

              <Input
                label='Password'
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text, passwordError: '' })}
                secureTextEntry
              />
              <Text style={styles.errorMessage}>{this.state.passwordError}</Text>

              <Input
                label='Confirm Password'
                value={this.state.rePassword}
                onChangeText={(text) => this.setState({ rePassword: text, rePasswordError: '' })}
                secureTextEntry
              />
              <Text style={styles.errorMessage}>{this.state.rePasswordError}</Text>
            </Form>

            <Button
              full
              style={styles.button}
              onPress={this.validateInputs}
            >
              <Text style={styles.btnText}>Submit</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
      ;
  }
}

export default SignUpScreen;
