import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  container: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
}));

const Landing = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth={"lg"}>
        {children}
      </Container>
    </div>
  );
};

Landing.propTypes = {
  children: PropTypes.node,
};

export default Landing;
