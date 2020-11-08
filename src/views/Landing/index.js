import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Paper,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: `${theme.spacing(8)}px !important`,
  },
  btnContainer: {
    height: "100%",
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row" component={Card}>
      <Grid item xs={12} md={8} component={Card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h2" gutterBottom>
            Get My Representative
          </Typography>
          <Typography variant="h5">
            Find information about your governmental representatives based on
            your location including: latest election data, recent bill votes,
            and platforms.
          </Typography>
        </CardContent>
      </Grid>
      <Grid item xs={12} md={4} component={Card}>
        <Grid
          container
          xs={12}
          className={clsx(classes.cardContent, classes.btnContainer)}
          component={CardContent}
          direction="column"
          justify="space-evenly"
        >
          <Grid item>
            <Button
              color="primary"
              variant={"contained"}
              fullWidth
              size={"large"}
            >
              Guess Location
            </Button>
          </Grid>
          <Grid item>
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
      </Grid>
    </Grid>
  );
};

export default Landing;
