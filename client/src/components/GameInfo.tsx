import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import GlobalStyles from "./GlobalStyles";

export default function RadioButtonsGroup() {
  const [rsvp, setRsvp] = useState<string>(`Yes, I'll be there!`);
  const [userEmail, setUserEmail] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRsvp((event.target as HTMLInputElement).value);
  };

  const handleUserEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUserEmail(event.target.value);
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
          <RadioGroup
            aria-label="RSVP"
            value={rsvp}
            name="RSVP"
            onChange={handleChange}
          >
            <FormControlLabel
              value="Yes, I'll be there!"
              control={<Radio />}
              label="Yes, I'll be there!"
            />
            <FormControlLabel
              value="Can't make it this week."
              control={<Radio />}
              label="Can't make it this week."
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box textAlign="center" m={2}>
        <Box m={2}>
          <TextField
            onChange={handleUserEmail}
            required
            size="small"
            label="Email"
            variant="outlined"
          />
        </Box>
        <Box>
          <Button size="medium" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
