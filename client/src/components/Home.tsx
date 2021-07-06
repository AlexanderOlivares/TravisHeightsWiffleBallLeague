import { Container, Typography, Box, Button } from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import Map from "./Map";
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";
import ImageSwiper from "./ImageSwiper";
import useMediaQuery from "./UseMediaQuery";

const Home: React.FC = () => {
  const mobileViewPort: boolean = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Container style={GlobalStyles.card} maxWidth="md">
        <Box>
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
              <Link
                to="/join"
                style={{ textDecoration: "none", color: "white" }}
              >
                Join The League
              </Link>
            </Button>
          </Box>
        </Box>
        {/* <Box style={GlobalStyles.div}>
          <ImageSwiper mobileViewPort={mobileViewPort} />
        </Box> */}
        <Box style={GlobalStyles.div}>
          <Typography align="center" variant="h5">
            We play at Little Stacy Park in Travis Heights
          </Typography>
          <Box id="map">
            <Map />
          </Box>
        </Box>
      </Container>
      <Box maxWidth="md">
        <ImageSwiper mobileViewPort={mobileViewPort} />
      </Box>
    </>
  );
};

export default Home;
