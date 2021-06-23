import React from "react";
import { Container, Typography, Box, Button } from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";

const Home = () => {
  return (
    <Container style={GlobalStyles.card} maxWidth="md">
      <Box style={GlobalStyles.card}>
        <Typography align="center" variant="h3">
          Travis Heights Wiffle Ball League
        </Typography>
        <Typography align="center" variant="h5">
          Free to play and open to all!
        </Typography>
        <Box m={2}>
          <Typography align="center" variant="h4">
            Join for free!
          </Typography>
        </Box>
        <Box textAlign="center">
          <Button size="medium" variant="contained" color="primary">
            Join The League
          </Button>
        </Box>
      </Box>
      <Box style={GlobalStyles.div}>pictures</Box>
      <Box style={GlobalStyles.div}>
        <Typography align="center" variant="h6">
          Where we play: Little Stacy Park in Travis Heights
        </Typography>
        map
      </Box>
    </Container>
  );
};

export default Home;
