import React from "react";
import {
  Container,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
  TextField,
  Button,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
      // "& .MuiTextField-root": {
      //   margin: theme.spacing(2),
      //   width: "40ch",
      // },
      textAlign: "center",
      margin: theme.spacing(2),
    },
    div: {
      padding: "20%",
    },
    button: {
      justify: "center",
    },
  });
});

export default function Join() {
  const classes = useStyles();
  return (
    <div>
      <Typography align="center" variant="h3">
        Join The League
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          size="small"
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <Button size="medium" variant="contained" color="primary">
          Join The League
        </Button>
      </form>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Select days that you are available
        </FormLabel>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="Any"
            control={<Checkbox color="primary" />}
            label="Any"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Mon"
            control={<Checkbox color="primary" />}
            label="Mon"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Tue"
            control={<Checkbox color="primary" />}
            label="Tue"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Wed"
            control={<Checkbox color="primary" />}
            label="Wed"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Thur"
            control={<Checkbox color="primary" />}
            label="Thur"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Fri"
            control={<Checkbox color="primary" />}
            label="Fri"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Sat"
            control={<Checkbox color="primary" />}
            label="Sat"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Sun"
            control={<Checkbox color="primary" />}
            label="Sun"
            labelPlacement="top"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
