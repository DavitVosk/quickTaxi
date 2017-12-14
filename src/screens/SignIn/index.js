import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Container, Content, Form, Button, Icon } from 'native-base';
import { connect } from 'react-redux';

import Header from '../../components/header';
import * as validate from '../../utils/validation/validation';
import styles from './styles';
import { signIn } from '../../actions';
import Input from '../../components/input';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.initialState = { email: '', password: '', emailError: '', passwordError: '' }
    this.state = this.initialState
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.navigation.navigate('map')
    } else if (nextProps.signInError) {
      Alert.alert(nextProps.signInError)
    }
  }

  validateInputs = () => {
    this.setState({ emailError: '', passwordError: '' });
    const { email, password } = this.state;

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

    validate_email && validate_password && this.props.signIn(email, password)
  };

  render() {
    return (
      <Container>
        <Header title='Sign In'
                left='arrow-back'
                leftPress={() => {
                  this.props.navigation.goBack(); 
                  this.setState({...this.initialState})
                }}
        />

        <Content keyboardShouldPersistTaps='always'
                 contentContainerStyle={styles.content}>
          <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
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
                label='Password'
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text, passwordError: '' })}
                secureTextEntry
              />
              <Text style={styles.errorMessage}>{this.state.passwordError}</Text>
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

const mapStateToProps = ({ auth }) => {
  return { user: auth.user, signInError: auth.signInError }
}

export default connect(mapStateToProps, { signIn })(SignInScreen);
