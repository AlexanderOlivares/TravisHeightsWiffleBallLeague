import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Join from "./components/Join";
import GameInfo from "./components/GameInfo";
import { Container, ThemeProvider } from "@material-ui/core";
import GlobalStyles from "./components/GlobalStyles";
import Unsubscribe from "./components/Unsubscribe";
import Theme from "./components/Theme";
import { ToastContainer } from "material-react-toastify";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Container style={GlobalStyles.container}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/join" component={Join} />
              <Route exact path="/gameinfo" component={GameInfo} />
              <Route exact path="/unsubscribe" component={Unsubscribe} />
            </Switch>
          </Router>
        </Container>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
