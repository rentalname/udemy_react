import { compose } from 'recompose';
import { withScriptjs, GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import React, { PropTypes } from 'react';

const InnerMap = compose(withScriptjs, withGoogleMap)(({ position, marker }) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={position}
    center={position}
  >
    <Marker {...marker} />
  </GoogleMap>
));

const Map = ({ lat, lng }) => {
  const position = { lat, lng };
  return (
    <InnerMap
      position={position}
      marker={{ position }}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '400px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
};

Map.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

Map.defaultProps = {
  lat: 40,
  lng: 100,
};

export default Map;
