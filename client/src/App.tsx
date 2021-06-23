import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Join from "./components/Join";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/contact" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
