import React, { Component } from 'react';
import { Animated, Easing, Text } from 'react-native';
import { Container, Content, Icon, Button } from 'native-base';

import * as Animatable from 'react-native-animatable';

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

import ButtonsGroup from '../../components/buttonsGroup';
import styles from './styles';

class WelcomeScreen extends Component {
  constructor() {
    super();
    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    return Animated.sequence([
      Animated.timing(
        this.animatedValue1,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
        }
      ),
      Animated.timing(
        this.animatedValue2,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
        }
      )
    ]).start()
  };

  render() {
    const scaleIcon = this.animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 70]
    });

    const opacityText = this.animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const spinText = this.animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '1080deg']
    });

    const opacityButtons = this.animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <Container style={{ backgroundColor: '#92B1E9' }}>
        <Content contentContainerStyle={styles.content}>
          <AnimatedIcon name='ios-car-outline' style={[styles.icon, { fontSize: scaleIcon }]} />

          <Animated.Text style={[styles.text, { opacity: opacityText, transform: [{ rotate: spinText }] }]}>
            Quick Taxi APP
          </Animated.Text>

          <Animated.View style={[styles.buttonasContainer, { opacity: opacityButtons }]}>
            <ButtonsGroup
              buttons={[
                { title: 'Sign In', navitageTo: () => this.props.navigation.navigate('signIn') },
                { title: 'Sign Up', navitageTo: () => this.props.navigation.navigate('signUp') },
                { title: 'Social Sign In', navitageTo: () => {} },
              ]}
            />
          </Animated.View>
        </Content>
      </Container>
    );
  }
}

export default WelcomeScreen;
