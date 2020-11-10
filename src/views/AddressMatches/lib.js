import React from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import {
  REACT_APP_GOOGLE_API_KEY,
  ADDRESS_MATCHES_API,
} from "../../config/vars";

export const AddressMatchesList = (props) => {
  const { onSelectMatch, matches, selectedIndex } = props;

  return (
    <Card>
      <CardContent>
        <List>
          {matches.map(({ address }, currentIndex) => {
            const isSelected = currentIndex === selectedIndex;
            const handleClick = () =>
              onSelectMatch(isSelected ? null : currentIndex);

            return (
              <ListItem
                button
                key={address}
                selected={isSelected}
                onClick={handleClick}
              >
                <ListItemText primary={address} />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

AddressMatchesList.propTypes = {
  onSelectMatch: PropTypes.func.isRequired,
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
    })
  ).isRequired,
  selectedIndex: PropTypes.oneOf([null, PropTypes.number]),
};

export const AddressMatchesMap = (props) => {
  const { mapContainerStyle, matches, selectedIndex, defaultCenter } = props;

  const selectedMatchCoords =
    selectedIndex !== null ? matches[selectedIndex].coords : null;

  return (
    <Card>
      <CardContent>
        <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}>
          <GoogleMap
            zoom={17}
            mapContainerStyle={mapContainerStyle}
            center={selectedMatchCoords || defaultCenter}
          >
            {selectedMatchCoords && <Marker position={selectedMatchCoords} />}
          </GoogleMap>
        </LoadScript>
      </CardContent>
    </Card>
  );
};

const coordObj = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number,
});
AddressMatchesMap.propTypes = {
  mapContainerStyle: stylePropType,
  defaultCenter: PropTypes.shape({
    coords: coordObj,
  }).isRequired,
  matches: PropTypes.arrayOf(coordObj).isRequired,
  selectedIndex: PropTypes.oneOf([null, PropTypes.number]),
};

export const fetchAddressMatches = async (coords) => {
  return axios
    .get(ADDRESS_MATCHES_API, { params: coords })
    .then(({ data }) => data.address_matches);
};
