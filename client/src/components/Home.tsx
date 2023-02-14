import { Container, Typography, Box, Button } from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import Map from "./Map";
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";
import useMediaQuery from "./UseMediaQuery";
import wiffleNewLogo from "../Assets/wiffleNewLogo.png";

const Home: React.FC = () => {
  const mobileViewPort: boolean = useMediaQuery("(max-width: 500px)");
  const wideViewPort: boolean = useMediaQuery("(min-width: 2500px)");
  const mapType: string = "roadmap";

  return (
    <>
      <Container style={GlobalStyles.card} maxWidth="md">
        <Box pt={2} textAlign="center">
          <img alt="Travis Hieights Wiffle Ball logo" src={wiffleNewLogo}></img>
        </Box>
        <Box>
          <Box my={2} textAlign="center">
            <Button style={GlobalStyles.button} size="medium" variant="contained" color="secondary">
              <Link to="/join" style={{ textDecoration: "none", color: "white" }}>
                Join The League
              </Link>
            </Button>
          </Box>
        </Box>
        <Box style={GlobalStyles.div}>
          <ImageSlider mobileViewPort={mobileViewPort} wideViewPort={wideViewPort} />
        </Box>
        <Box style={GlobalStyles.div}>
          <Typography align="center" variant="h5">
            We play at the Blunn Creek Greenbelt just south of Little Stacy Park
          </Typography>
          <Box m={2} id="map">
            <Map mapType={mapType} />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
