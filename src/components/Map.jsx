import { compose } from 'recompose';
import { withScriptjs, GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import React from 'react';
import PropTypes from 'prop-types';

const InnerMap = compose(withScriptjs, withGoogleMap)(({ location, marker }) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={location}
    center={location}
  >
    <Marker {...marker} />
  </GoogleMap>
));

const Map = ({ location }) => (
  <InnerMap
    location={location}
    marker={{ position: location }}
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div className="map-loading-element" />}
    containerElement={<div className="map-container-element" />}
    mapElement={<div className="map-element" />}
  />
);

Map.propTypes = {
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Map;
