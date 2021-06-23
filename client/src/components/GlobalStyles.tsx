import bgImage from "../Assets/chainlink.jpeg";
import wiffleBall2 from "../Assets/wiffleBall2.png";
import wiffleBgMobile from "../Assets/wiffleBgMobile.png";

const GlobalStyles = {
  container: {
    minHeight: "100vh",
    height: "100%",
    minWidth: "100vw",
    width: "100%",
    margin: "0px",
    padding: "0px",
    // backgroundImage: `url(${bgImage})`,
    backgroundImage: `url(${wiffleBgMobile})`,
    opacity: "0.9",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
    backgroundPosition: "center",
  },
  div: {
    padding: "20%",
  },
  button: {
    justify: "center",
  },
  card: {
    backgroundColor: "white",
    // backgroundImage: `url(${wiffleBall2})`,
    opacity: "0.9",
    backdropFilter: "blur(1px)",
    height: "100%",
    minHeight: "100vh",
    maxWidth: "100vw",
    width: "100%",
    padding: "0px",
    // borderRadius: "5px",
  },
};

export default GlobalStyles;
