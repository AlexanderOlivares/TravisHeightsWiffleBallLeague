import React from "react";
import {
  Button,
  Container,
  TextField,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
      "& .MuiTextField-root": {
        margin: theme.spacing(2),
        width: "40ch",
      },
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
        <Typography align="center" variant="h6">
          Free to play and open to all!
        </Typography>
      </Box>
      <Box className={classes.div}>pictures</Box>
      <Box className={classes.div}>
        <Typography align="center" variant="h6">
          Where we play: Little Stacy Park in Travis Heights
        </Typography>
        map
      </Box>
      <Box>
        <Typography align="center" variant="h4">
          Join for free!
        </Typography>
        <Typography align="center" variant="h6">
          We will email you game times each week
        </Typography>
      </Box>
      <Box m="auto">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Name" variant="outlined" />
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
        <Box textAlign="center">
          <Button variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
