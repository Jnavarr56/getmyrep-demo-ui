import React, { useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  makeStyles,
  Paper,
  Fade,
} from "@material-ui/core";
import { isCoordsLoaded } from "helpers/coords";
import { LocationContext } from "context/LocationProvider";
import { Link as RouterLink, Redirect } from "react-router-dom";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    overflow: "auto",
    display: "flex",
    alignItems: "flex-start",
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      paddingTop: "20%",
    },
  },
  card: {
    width: "100%",
  },
  cardContent: {
    padding: `0px !important`,
  },
  paper: {
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6, 5),
    },
  },
  list: {
    paddingLeft: 20,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& .MuiButton-root": {
      margin: theme.spacing(1, 0),
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(2, 0),
      },
    },
  },
}));

const Landing = () => {
  const { locationState } = useContext(LocationContext);

  const classes = useStyles();

  if (isCoordsLoaded(locationState)) {
    return <Redirect to="/address-matches" />;
  }

  return (
    <div className={classes.root}>
      <Fade in>
        <Card className={classes.card}>
          <Grid
            container
            className={classes.cardContent}
            component={CardContent}
          >
            <Grid
              item
              xs={12}
              md={8}
              component={Paper}
              className={classes.paper}
            >
              <Typography variant="h3" gutterBottom>
                Get My Representative
              </Typography>
              <Typography variant="h5" gutterBottom>
                Find information about your governmental representatives
                <br />
                based on your location including:
              </Typography>
              <Typography variant="h5" gutterBottom>
                <ul className={classes.list}>
                  <li>latest election data</li>
                  <li>recent bill votes</li>
                  <li>platforms</li>
                </ul>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              className={clsx(classes.btnContainer, classes.paper)}
              component={Paper}
            >
              <Button
                color="primary"
                variant={"contained"}
                fullWidth
                size={"large"}
                to="/guess-coordinates"
                component={RouterLink}
              >
                Guess Location
              </Button>
              <Button
                color="secondary"
                variant={"contained"}
                fullWidth
                size={"large"}
              >
                Enter an address
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Fade>
    </div>
  );
};

export default Landing;
