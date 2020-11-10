import React from "react";
import { CssBaseline } from "@material-ui/core";
import LocationContextProvider from "context/LocationProvider";

const App = () => {
  return (
    <>
      <CssBaseline />
      <LocationContextProvider />
    </>
  );
};

export default App;
