import React from "react";
import { AppBar, Container, Toolbar, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Landing = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar></Toolbar>
      </AppBar>
      <Container maxWidth={"lg"}>{children}</Container>
    </div>
  );
};

Landing.propTypes = {
  children: PropTypes.node,
};

export default Landing;
