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
  Dialog,
  Divider,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

import { isCoordsLoaded } from "../../helpers/coords";
import * as geolib from "./lib";

const useStyles = makeStyles({
  progress: {
    display: "block",
    margin: "0 auto",
  },
  typography: {
    marginBottom: 32,
  },
});

const Geolocation = () => {
  const { locationState, locationDispatch } = useContext(LocationContext);

  const classes = useStyles();

  const history = useHistory();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [prompted, setPrompted] = useState(false);
  const [fetching, setFetching] = useState(false);

  const handleConfirmPrompt = useCallback(() => setPrompted(true), []);
  //eslint-disable-next-line
  const handleGoBack = useCallback(() => history.push("/"), []);
  const handleConfirmError = useCallback(() => {
    setError(false);
    setPrompted(false);
    setFetching(false);
  }, []);
  const handleResetErrorMsg = useCallback(() => setErrorMessage(""), []);

  useEffect(() => {
    let mounted = true;

    if (prompted) {
      setFetching(true);
      geolib
        .geolocateAsync()
        .then((coords) => {
          console.log(coords);
          if (!mounted) return;

          setFetching(false);
          locationDispatch({ type: "SET_COORDS", coords });
        })
        .catch((msg) => {
          if (!mounted) return;

          setError(true);
          setErrorMessage(msg);
          setFetching(false);
        });
    }

    return () => (mounted = false);
    //eslint-disable-next-line
  }, [prompted]);

  // If coords already determined navigate forward.
  if (isCoordsLoaded(locationState.coords))
    return <Redirect to="/address-matches" />;

  if (fetching) {
    return <Progress variant="query" className={classes.progress} />;
  }

  return (
    <Fade in>
      <div>
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
        <Dialog
          open={error}
          onClose={handleConfirmError}
          onExited={handleResetErrorMsg}
        >
          <DialogTitle>Error!</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText>{errorMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant={"outlined"}
              onClick={handleConfirmError}
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fade>
  );
};

export default Geolocation;
