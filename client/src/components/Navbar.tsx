import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#eed743",
      position: "-webkit-sticky",
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
    link: {
      textDecoration: "none",
    },
  })
);

function Navbar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              HOME
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/join" className={classes.link}>
              JOIN
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/gameinfo" className={classes.link}>
              GAME INFO
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
