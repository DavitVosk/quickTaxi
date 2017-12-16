import React from 'react';
import { Icon } from 'native-base';
import { MapView } from 'expo';


const Marker = ({drivers}) => {
 return  drivers.map((driver, i) => (
    <MapView.Marker
      key={i}
      coordinate={driver.location}
      title={driver.name}
    >
      <Icon name='car'></Icon>
    </MapView.Marker>
  ))
};

export default Marker;
