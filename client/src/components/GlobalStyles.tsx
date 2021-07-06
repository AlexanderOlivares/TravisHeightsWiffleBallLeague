import bgPhoto from "../Assets/bgPhoto.jpeg";

const GlobalStyles = {
  container: {
    minHeight: "100vh",
    height: "100%",
    minWidth: "100vw",
    width: "100%",
    marginTop: "70px",
    padding: "0px",
    background: `url(${bgPhoto})`,
    backgroundPosition: "center",
  },
  div: {
    padding: "5%",
  },
  button: {
    justify: "center",
    opacity: "1",
  },
  card: {
    height: "100vh",
    maxWidth: "100vw",
    width: "100%",
    padding: "0px",
  },
  swiper: {
    border: "4px solid red",
    // padding: "5%",
  },
  swiperImg: {
    minWidth: "400px",
    objectFit: "cover",
  },
};

export default GlobalStyles;
