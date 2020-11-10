import React, { useEffect, useContext, useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Divider,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import * as addressLib from "./lib";
import { LocationContext } from "../../context/LocationProvider";
import { isCoordsLoaded, isAddressMatchesLoaded } from "../../helpers/coords";

const MAP_DIMENSIONS = { height: 300, width: "100%" };

const AddressMatches = () => {
  const { locationState, locationDispatch } = useContext(LocationContext);

  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [matches, setMatches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleGuessCoordsAgain = useCallback(
    () => locationDispatch({ type: "RESET_COORDS" }),
    //eslint-disable-next-line
    []
  );
  const handleFinalizeMatch = () =>
    locationDispatch({
      type: "SET_ADDRESS_AND_MATCHES",
      addressMatches: matches,
      selectedAddressIndex: selectedIndex,
    });

  const handleSelectMatch = useCallback(
    (matchIndex) => setSelectedIndex(matchIndex),
    []
  );

  useEffect(() => {
    if (isAddressMatchesLoaded(locationState)) {
      setMatches(locationState.addressMatches);
      setFetching(false);
      return;
    }

    let mounted = true;

    addressLib
      .fetchAddressMatches(locationState.coords)
      .then((newMatches) => {
        if (!mounted) return;

        setMatches(newMatches);
        setFetching(false);
      })
      .catch((error) => {
        if (!mounted) return;

        console.log(error);

        setError(error);
        setFetching(false);
      });

    return () => (mounted = false);

    // eslint-disable-next-line
  }, []);

  if (!isCoordsLoaded(locationState)) return <Redirect to="/geolocation" />;

  return (
    <Card>
      <CardHeader title={"Address Matches"} />
      <Divider />
      <CardContent>
        {fetching ? (
          <CircularProgress />
        ) : (
          <Grid container>
            <Grid item xs={12} md={7}>
              <addressLib.AddressMatchesList
                matches={matches}
                selectedIndex={selectedIndex}
                onSelectMatch={handleSelectMatch}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <addressLib.AddressMatchesMap
                matches={matches}
                mapContainerStyle={MAP_DIMENSIONS}
                defaultCenter={locationState.coords}
                selectedIndex={selectedIndex}
              />
            </Grid>
          </Grid>
        )}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          disabled={selectedIndex === null}
          onClick={handleFinalizeMatch}
        >
          Select
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGuessCoordsAgain}
        >
          Guess Location Again
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddressMatches;
