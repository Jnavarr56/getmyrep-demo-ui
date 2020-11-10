import React, { useEffect, useContext, useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Divider,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { fetchAddressMatches } from "./lib";
import { AddressMatchesList, AddressMatchesMap } from "./components";
import { LocationContext } from "context/LocationProvider";
import { isCoordsLoaded, isAddressMatchesLoaded } from "helpers/coords";

const MAP_DIMENSIONS = { height: "100%", width: "100%" };

const useStyles = makeStyles({
  root: {
    height: "80vh",
  },
});

const AddressMatches = () => {
  const { locationState, locationDispatch } = useContext(LocationContext);

  const classes = useStyles();

  // const [error, setError] = useState(null);
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

    fetchAddressMatches(locationState.coords)
      .then((newMatches) => {
        if (!mounted) return;
        setMatches(newMatches);
        setFetching(false);
      })
      .catch((error) => {
        if (!mounted) return;
        // setError(error);
        setFetching(false);
      });

    return () => (mounted = false);

    // eslint-disable-next-line
  }, []);

  if (!isCoordsLoaded(locationState))
    return <Redirect to="/guess-coordinates" />;

  return (
    <Card>
      {fetching ? (
        <CircularProgress />
      ) : (
        <Grid container className={classes.root}>
          <Grid item xs={12} md={7}>
            <CardContent>
              <AddressMatchesList
                matches={matches}
                selectedIndex={selectedIndex}
                onSelectMatch={handleSelectMatch}
              />
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
                Guess Again
              </Button>
            </CardActions>
          </Grid>
          <Grid item xs={12} md={5}>
            <AddressMatchesMap
              matches={matches}
              mapContainerStyle={MAP_DIMENSIONS}
              defaultCenter={locationState.coords}
              selectedIndex={selectedIndex}
            />
          </Grid>
        </Grid>
      )}
    </Card>
  );
};

export default AddressMatches;
