import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
  },
  child: {
    flexGrow: 1,
    overflow: "hidden",
    width: "100%",
  },
}));

// Just a simple page layout.
const Main = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant={"h6"}>Gey My Rep</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.child}>{children}</div>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
