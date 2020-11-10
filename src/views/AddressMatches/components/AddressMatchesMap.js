import React from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  ADDRESS_DATA_SHAPE,
  ADDRESS_MATCHES_SHAPE,
} from "../../../config/server";
import { GOOGLE_API_KEY } from "../../../config/vars";

const AddressMatchesMap = (props) => {
  const { mapContainerStyle, matches, selectedIndex, defaultCenter } = props;

  const selectedMatchCoords =
    selectedIndex !== null ? matches[selectedIndex].coords : null;

  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
      <GoogleMap
        zoom={17}
        mapContainerStyle={mapContainerStyle}
        center={selectedMatchCoords || defaultCenter}
      >
        {selectedMatchCoords && <Marker position={selectedMatchCoords} />}
      </GoogleMap>
    </LoadScript>
  );
};

AddressMatchesMap.propTypes = {
  mapContainerStyle: stylePropType,
  defaultCenter: ADDRESS_DATA_SHAPE.isRequired,
  matches: ADDRESS_MATCHES_SHAPE.isRequired,
  selectedIndex: PropTypes.oneOf([null, PropTypes.number]),
};

export default AddressMatchesMap;
