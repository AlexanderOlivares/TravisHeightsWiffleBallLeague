import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import GlobalStyles from "./GlobalStyles";

export default function RadioButtonsGroup() {
  const [value, setValue] = useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Box style={GlobalStyles.card}>
      <Box>
        <Typography align="center" variant="h3">
          Next Game is Sun 7/11 at 6pm
        </Typography>
        <Typography align="center" variant="h5">
          RSVP
        </Typography>
      </Box>
      <Box m={2} textAlign="center">
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">RSVP</FormLabel> */}
          <RadioGroup
            aria-label="RSVP"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Yes, I'll be there!"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Can't make it this week."
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box textAlign="center" m={2}>
        <Box m={2}>
          <TextField size="small" label="Email" variant="outlined" />
        </Box>
        <Box>
          <Button size="medium" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
        <Box m={2}>
          <Typography variant="caption">
            We will only email you about game and league information.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
