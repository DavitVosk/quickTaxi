import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Content } from 'native-base';

import { MapView } from 'expo';

class MapScreen extends Component {
  state = {
   region: new MapView.AnimatedRegion({
     latitude: 39.749632,
     longitude: - 105.000363,
     latitudeDelta: 0.0222,
     longitudeDelta: 0.0201,
   })
  };

  onRegionChange = (region) => {
    this.setState({ region });
  };

  render() {
    return (
      <MapView.Animated
        style={{ flex: 1 }}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      >
        <MapView.Marker
          draggable
          coordinate={{ longitude: - 105.00033, latitude: 39.749633 }}
          description='description'
          title='title'
        />
      </MapView.Animated>
    );
  }
}

const styles = {
  container: {}
};

export default MapScreen;
