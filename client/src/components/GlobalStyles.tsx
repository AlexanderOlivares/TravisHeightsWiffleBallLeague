import wiffleBgMobile from "../Assets/wiffleBgMobile.png";

const GlobalStyles = {
  container: {
    minHeight: "100vh",
    height: "100%",
    minWidth: "100vw",
    width: "100%",
    marginTop: "70px",
    padding: "0px",
    backgroundImage: `url(${wiffleBgMobile})`,
    opacity: "0.9",
    // backdropFilter: "opacity(80%)",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
    backgroundPosition: "center",
  },
  div: {
    padding: "20%",
  },
  button: {
    justify: "center",
    opacity: "1",
  },
  card: {
    backgroundColor: "white",
    opacity: "0.9",
    backdropFilter: "blur(3px)",
    height: "100%",
    minHeight: "100vh",
    maxWidth: "100vw",
    width: "100%",
    padding: "0px",
  },
};

export default GlobalStyles;
