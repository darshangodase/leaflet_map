import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const MarkerComponent = ({ position, popupText }) => {
  return (
    <Marker position={position}>
      <Popup>{popupText}</Popup>
    </Marker>
  );
};

export default MarkerComponent;