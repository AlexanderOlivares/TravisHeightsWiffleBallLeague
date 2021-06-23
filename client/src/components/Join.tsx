import React from "react";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import GlobalStyles from "./GlobalStyles";

export default function Join() {
  return (
    <Box style={GlobalStyles.card}>
      <Box>
        <Typography align="center" variant="h3">
          Join The League
        </Typography>
        <Typography align="center" variant="h6">
          Free to play and open to all!
        </Typography>
      </Box>
      <Box m={2} textAlign="center">
        <Box m={2}>
          <TextField size="small" label="Name" variant="outlined" />
        </Box>
        <Box m={2}>
          <TextField size="small" label="Email" variant="outlined" />
        </Box>
        <Box m={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <Typography align="center" variant="h6">
                Select days you can play
              </Typography>
            </FormLabel>
            <br></br>
            <Box display="flex" justifyContent="center" alignItems="center">
              <FormGroup aria-label="position" row={true}>
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
            </Box>
            <Box m={2}>
              <Typography align="center" variant="subtitle1">
                (At the moment games are usually Sunday mornings or Sunday
                evenings. We are thinking about adding games on Saturdays and
                weeknights)
              </Typography>
            </Box>
          </FormControl>
        </Box>
        <Box m={3}>
          <Button size="medium" variant="contained" color="primary">
            Join The League
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
