import React from "react";
import {
  Container,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
  TextField,
  Button,
} from "@material-ui/core";
import Join from "./Join";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
      // "& .MuiTextField-root": {
      //   margin: theme.spacing(2),
      //   width: "40ch",
      // },
      textAlign: "center",
      margin: theme.spacing(2),
    },
    div: {
      padding: "20%",
    },
    button: {
      justify: "center",
    },
  });
});

const Home = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Box m={2}>
        <Typography align="center" variant="h3">
          Travis Heights Wiffle Ball League
        </Typography>
        <Typography align="center" variant="h5">
          Free to play and open to all!
        </Typography>
      </Box>
      <Box m={2}>
        <Typography align="center" variant="h4">
          Join for free!
        </Typography>
      </Box>
      <Box textAlign="center">
        <Button
          className={classes.button}
          size="medium"
          variant="contained"
          color="primary"
        >
          Join The League
        </Button>
      </Box>
      <Box className={classes.div}>pictures</Box>
      <Box className={classes.div}>
        <Typography align="center" variant="h6">
          Where we play: Little Stacy Park in Travis Heights
        </Typography>
        map
      </Box>
    </Container>
  );
};

export default Home;
