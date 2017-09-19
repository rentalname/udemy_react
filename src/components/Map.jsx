import { compose } from 'recompose';
import { withScriptjs, GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import React from 'react';
import PropTypes from 'prop-types';

const InnerMap = compose(withScriptjs, withGoogleMap)(({ location, marker }) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={position}
    center={position}
  >
    <Marker {...marker} />
  </GoogleMap>
));

const Map = ({ location }) => (
  <InnerMap
    location={location}
    marker={{ location }}
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: '100%' }} />}
    containerElement={<div style={{ height: '400px' }} />}
    mapElement={<div style={{ height: '100%' }} />}
  />
);

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default Map;
