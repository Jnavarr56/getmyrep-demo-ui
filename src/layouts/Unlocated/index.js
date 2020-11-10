import React from "react";
import { AppBar, Container, Toolbar, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    paddingTop: theme.spacing(3),
  },
}));

const Landing = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth={"lg"}>{children}</Container>
    </div>
  );
};

Landing.propTypes = {
  children: PropTypes.node,
};

export default Landing;
