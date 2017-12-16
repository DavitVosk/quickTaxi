import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Container, Content, Button, Icon } from 'native-base';
import { Permissions, Location, Constants, MapView } from 'expo';
import firebase from 'firebase';

import styles from './styles';
import DriversMarker from '../../components/marker';

class MapScreen extends Component {
  state = {
    errorMessage: null,
    region: null,
    currentLocation: null,
    mapLoaded: false,
    drivers: []
  };

  showCurrentLocation = () => {
    this.setState({ region: this.state.currentLocation })
  };

  // animateRegion = () => {
  //   this.setState({
  //     region: {
  //       latitude: 37.7385834,
  //       latitudeDelta: 0.0222,
  //       longitude: - 122.406417,
  //       longitudeDelta: 0.0201,
  //     }
  //   })
  // };

  componentWillMount() {
    if (Platform.OS === 'android' && ! Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

    // take drivers list from backend
    firebase.database().ref().child('drivers').on('value', (snap) => {
      var drivers = [];
      snap.forEach((child) => {
        drivers.push(child.val());
        this.setState({ drivers })
      });
    })
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let { 'coords': { latitude, longitude } } = await Location.getCurrentPositionAsync({});

    this.setState({
      region: {
        longitude,
        latitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0201,
      },
      currentLocation:{
        longitude,
        latitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0201,
      },
      mapLoaded: true
    });

  };

  onRegionChange = (region) => {
    this.setState({ region });
  };

  render() {
    console.log('state', this.state);
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1, }}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          <DriversMarker
            drivers={this.state.drivers}
          />
        </MapView>

        {
          this.state.mapLoaded && (
            <View>
              <Icon
                name='md-locate'
                style={styles.locateIcon}
                onPress={this.showCurrentLocation}
              />

              <Button
                full
                style={styles.button}
                onPress={this.animateRegion}
              >
                <Text style={styles.text}>Find Me A Taxi</Text>
              </Button>
            </View>

          )
        }
      </View>
    );
  }
}

export default MapScreen;
