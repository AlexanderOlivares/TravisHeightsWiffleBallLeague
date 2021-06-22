import React from "react";
import {
  Button,
  Container,
  TextField,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    div: {
      padding: "20%",
    },
  });
});

const Home = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <div>
        <Typography variant="h3">Travis Heights Wiffle Ball League</Typography>
      </div>
      <div className={classes.div}>pictures</div>
      <div className={classes.div}>map</div>
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Name" variant="outlined" />
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
      </div>
      <div>Join for free!</div>
      <Button variant="contained" color="primary">
        Sign Up
      </Button>
    </Container>
  );
};

export default Home;
