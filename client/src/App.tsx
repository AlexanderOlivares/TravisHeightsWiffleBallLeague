import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Join from "./components/Join";
import GameInfo from "./components/GameInfo";
import { Container } from "@material-ui/core";
import GlobalStyles from "./components/GlobalStyles";
import Unsubscribe from "./components/Unsubscribe";

function App() {
  return (
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
  );
}

export default App;
