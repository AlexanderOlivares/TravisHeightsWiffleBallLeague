import { ThemeProvider, CssBaseline, createMuiTheme } from "@material-ui/core";
import bgImage from "../Assets/chainlink.jpeg";

const Themex = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          minHeight: "100%",
          backgroundImage: `url(${bgImage})`,
        },
      },
    },
  },
});

export default Themex;
