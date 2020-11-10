import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  Divider,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

const ErrorDialog = (props) => {
  const { errorMessage: errorMessageProp, onConfirmError } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const handleExit = useCallback(() => setErrorMessage(""), []);

  useEffect(() => {
    if (errorMessageProp) {
      setErrorMessage(errorMessageProp);
    }
  }, [errorMessageProp]);

  return (
    <Dialog
      open={Boolean(errorMessageProp)}
      onClose={onConfirmError}
      onExited={handleExit}
    >
      <DialogTitle>Oops!</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>{errorMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onConfirmError} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ErrorDialog.propTypes = {
  errorMessage: PropTypes.string,
  onConfirmError: PropTypes.func.isRequired,
};

export default ErrorDialog;
