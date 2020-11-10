import React, { useEffect, useContext, useState, useCallback } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { LocationContext } from "../../context/LocationProvider";
import {
  Grid,
  Button,
  Fade,
  LinearProgress as Progress,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { isCoordsLoaded } from "helpers/coords";
import { ErrorDialog } from "./components";
import { geolocateAsync } from "./lib";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    paddingTop: "35%",
  },
  progress: {
    display: "block",
    margin: "0 auto",
  },
  typography: {
    marginBottom: 32,
  },
}));

const GuessCoordinates = () => {
  const { locationState, locationDispatch } = useContext(LocationContext);

  const classes = useStyles();
  const history = useHistory();

  const [error, setError] = useState("");
  const [prompted, setPrompted] = useState(false);
  const [fetching, setFetching] = useState(false);

  //eslint-disable-next-line
  const handleGoBack = useCallback(() => history.push("/"), []);
  const handleConfirmPrompt = useCallback(() => setPrompted(true), []);
  const handleConfirmError = useCallback(() => {
    setError("");
    setPrompted(false);
    setFetching(false);
  }, []);

  useEffect(() => {
    let mounted = true;

    if (prompted) {
      setFetching(true);

      geolocateAsync()
        .then((coords) => {
          if (!mounted) return;
          setFetching(false);
          locationDispatch({ type: "SET_COORDS", coords });
        })
        .catch((errorMsg) => {
          if (!mounted) return;
          setError(errorMsg);
          setFetching(false);
        });
    }

    return () => (mounted = false);
    //eslint-disable-next-line
  }, [prompted]);

  if (isCoordsLoaded(locationState)) {
    return <Redirect to="/address-matches" />;
  }

  if (fetching) {
    return <Progress variant="query" className={classes.progress} />;
  }

  return (
    <Fade in>
      <div className={classes.root}>
        <Typography
          variant="h3"
          gutterbottom
          align="center"
          className={classes.typography}
        >
          Ready for me to guess your location?
        </Typography>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              onClick={handleConfirmPrompt}
              color="primary"
              size="large"
              fullWidth
            >
              Sure
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleGoBack}
              fullWidth
            >
              No
            </Button>
          </Grid>
        </Grid>
        <ErrorDialog onConfirmError={handleConfirmError} errorMessage={error} />
      </div>
    </Fade>
  );
};

export default GuessCoordinates;
