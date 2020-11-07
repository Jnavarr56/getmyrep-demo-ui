import React, { useEffect, useContext, useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { LocationContext } from "../../context/LocationProvider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";

const DETECTION_OPTIONS = { enableHighAccuracy: true };

const Geolocation = () => {
  const { locationState, locationDispatch } = useContext(LocationContext);

  const [prompted, setPrompted] = useState(false);
  const [error, setError] = useState(null);

  const [fetching, setFetching] = useState(false);
  const [openDialog, setOpenDialog] = useState(true);

  const handleConfirmPrompt = useCallback(() => setPrompted(true), []);

  useEffect(() => {
    if (prompted) {
      let mounted = true;
      const initGeolocation = () => {
        setFetching(true);
        setOpenDialog(false);
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            if (!mounted) return;
            setFetching(false);
            locationDispatch({
              type: "SET_COORDS",
              coords: {
                lat: coords.latitude,
                lng: coords.longitude,
              },
            });
          },
          (error) => {
            console.log(error);
            if (!mounted) return;
            setError(error);
            setFetching(false);
            setOpenDialog(true);
          },
          DETECTION_OPTIONS
        );
      };

      initGeolocation();
    }
    //eslint-disable-next-line
  }, [prompted]);

  const coordsAlreadyDetermined =
    locationState.coords.lat && locationState.coords.lng;

  if (coordsAlreadyDetermined) return <Redirect to="/address-matches" />;

  return fetching ? (
    <CircularProgress />
  ) : (
    <Dialog open={openDialog}>
      <DialogTitle>{error ? "Error" : "Get Started"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {error
            ? "We've hit a snag, oops!"
            : "Hit okay for me to try and guess your current address."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmPrompt} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Geolocation;
