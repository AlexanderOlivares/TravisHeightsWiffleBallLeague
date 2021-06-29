import { Container, Typography, Box, Button } from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import Map from "./Map";
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";

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
          <Button
            style={GlobalStyles.button}
            size="medium"
            variant="contained"
            color="primary"
          >
            <Link to="/join" style={{ textDecoration: "none", color: "white" }}>
              Join The League
            </Link>
          </Button>
        </Box>
      </Box>
      <Box style={GlobalStyles.div}>
        <ImageSlider />
      </Box>
      <Box style={GlobalStyles.div}>
        <Typography align="center" variant="h5">
          We play at Little Stacy Park in Travis Heights
        </Typography>
        <Box id="map">
          <Map />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
