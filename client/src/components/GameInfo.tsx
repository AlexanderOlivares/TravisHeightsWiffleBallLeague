import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import GlobalStyles from "./GlobalStyles";
import ImageSlider from "./ImageSlider";

export default function RadioButtonsGroup() {
  const [rsvp, setRsvp] = useState<string>(`true`);
  const [userEmail, setUserEmail] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    setRsvp((event.target as HTMLInputElement).value);
  };

  const handleUserEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUserEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const RSVP_BOOL: boolean = rsvp === "true";

    try {
      const body: {
        userEmail: string;
        RSVP_BOOL: boolean;
      } = {
        userEmail,
        RSVP_BOOL,
      };

      const response = await fetch(`http://localhost:5000/api/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      alert(await response.json());
    } catch (error) {
      console.error(error.message);
      alert("Oops something went wrong. Please try again later.");
    }
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
      <form onSubmit={handleSubmit}>
        <Box textAlign="center">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="RSVP"
              value={rsvp}
              name="RSVP"
              onChange={handleChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Yes, I'll be there!"
              />
              <FormControlLabel
                value="false"
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
              type="email"
              size="small"
              label="Email"
              variant="outlined"
            />
          </Box>
          <Box>
            <Button
              type="submit"
              size="medium"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Box style={GlobalStyles.div}>
          <ImageSlider />
        </Box>
      </form>
    </Box>
  );
}
