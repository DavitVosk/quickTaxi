import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { Permissions, Location, Constants } from 'expo';

import { MapView } from 'expo';

class MapScreen extends Component {
  // state = {
  //  region: {
  //    latitude: 39.749632,
  //    longitude: - 105.000363,
  //    latitudeDelta: 0.0222,
  //    longitudeDelta: 0.0201,
  //  }
  // };
  state = {
    currentLocation: null,
    errorMessage: null,
    region: null
  };

  componentWillMount() {
    if (Platform.OS === 'android' && ! Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    // let location = Location.reverseGeocodeAsync(x)
    this.setState({ currentLocation });

    // console.log('location', this.state.location);
  };

  onRegionChange = (region) => {
    console.log('rrrrr', region);
    this.setState({ region });
  };

  render() {
    console.log('region', this.state.region);
    console.log('current location', this.state.currentLocation);
    return (
      this.state.currentLocation ?
        <View style={{ flex: 1 }}>
          <MapView.Animated
            style={{ flex: 1 }}
            initialRegion={{
              ...this.state.currentLocation['coords'],
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0201
            }}
            // region={{
            //   ...this.state.region,
            //   // latitudeDelta: 0.0222,
            //   // longitudeDelta: 0.0201
            // }}
            onRegionChange={this.onRegionChange}
          />
          <Button
            on

            full style={{ marginBottom: 50 }} />
        </View>
        :
        null
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
};

export default MapScreen;
