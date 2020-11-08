import React, { useEffect, useContext, useState, useCallback } from "react";
import { Redirect } from "react-router-dom";

import { LocationContext } from "../../context/LocationProvider";
import {
  Button,
  Divider,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";

const ADDRESS_MATCHES_API = "http://localhost:3000/api/geocode";

const AddressMatches = () => {
  const { locationState, locationDispatch } = useContext(LocationContext);
  const { coords, selectedAddressIndex, addressMatches } = locationState;

  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  const [matches, setMatches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleGuessCoordsAgain = useCallback(
    () => locationDispatch({ type: "RESET_COORDS" }),
    []
  );
  const handleSelectAddress = () =>
    locationDispatch({
      type: "SET_ADDRESS_AND_MATCHES",
      addressMatches: matches,
      selectedAddressIndex: selectedIndex,
    });

  useEffect(() => {
    if (addressMatches.length > 0) {
      setMatches(addressMatches);
      setSelectedIndex((prev) => selectedAddressIndex || prev);
      setFetching(false);
      return;
    }

    let mounted = true;

    const fetchAddressMatches = () => {
      axios
        .get(ADDRESS_MATCHES_API, { params: locationState.coords })
        .then(({ data }) => {
          if (!mounted) return;
          setMatches(data.address_matches);
          setFetching(false);
        })
        .catch((error) => {
          console.log(error);

          if (!mounted) return;
          setError(error);
          setFetching(false);
        });
    };

    fetchAddressMatches();

    // eslint-disable-next-line
  }, []);

  const coordsMissing = !coords.lat && !coords.lat;
  if (coordsMissing) return <Redirect to="/geolocation" />;

  const addressAlreadySelected =
    selectedAddressIndex !== null && addressMatches.length > 0;

  if (addressAlreadySelected) return <Redirect to="/home" />;

  return (
    <Card>
      <CardHeader title={"Address Matches"} />
      <Divider />
      <CardContent>
        {fetching ? (
          <CircularProgress />
        ) : (
          <List>
            {matches.map((addressData, i) => {
              const isSelected = i === selectedIndex;
              const handleClick = () => setSelectedIndex(isSelected ? null : i);
              return (
                <ListItem
                  button
                  key={addressData.address}
                  selected={isSelected}
                  onClick={handleClick}
                >
                  <ListItemText primary={addressData.address} />
                </ListItem>
              );
            })}
          </List>
        )}
      </CardContent>
      <CardActions>
        <Button onClick={handleGuessCoordsAgain}>Guess Location Again</Button>
        <Button onClick={handleSelectAddress}>Select</Button>
      </CardActions>
    </Card>
  );
};

export default AddressMatches;
