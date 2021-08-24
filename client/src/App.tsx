import { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Join from "./components/Join";
import GameInfo from "./components/GameInfo";
import { Container, ThemeProvider } from "@material-ui/core";
import GlobalStyles from "./components/GlobalStyles";
import Unsubscribe from "./components/Unsubscribe";
import Theme from "./components/Theme";
import AdminLogin from "./components/Admin/AdminLogin";
import { ToastContainer } from "material-react-toastify";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Rsvp from "./components/Rsvp";
import ResetPassword from "./components/Admin/ResetPassword";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  async function isAuth() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/is-verified`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const verifiedToken = await response.json();
      console.log(verifiedToken);

      verifiedToken === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);
    } catch (err) {
      setIsAuthenticated(false);
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  const setAuth = () => setIsAuthenticated(!isAuthenticated);

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
              <Route exact path="/rsvp/:id" component={Rsvp} />
              <Route exact path="/unsubscribe" component={Unsubscribe} />
              <Route
                exact
                path="/resetpassword/:id?"
                component={ResetPassword}
              />
              <Route exact path="/admin">
                {isAuthenticated ? (
                  <AdminDashboard setAuth={setAuth} />
                ) : (
                  <AdminLogin setAuth={setAuth} />
                )}
              </Route>
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
