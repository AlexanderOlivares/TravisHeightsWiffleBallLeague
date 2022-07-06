import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import GlobalStyles from "./GlobalStyles";
import { toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import Map from "./Map";
import { Redirect, Link } from "react-router-dom";

const GameInfo: React.FC = () => {
  const mapType: string = "hybrid";

  const [redirectToJoin, setRedirectToJoin] = useState<boolean>(false);
  const [rsvp, setRsvp] = useState<string>("true");
  const [userEmail, setUserEmail] = useState<string>("");

  const handleRadioButtons = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRsvp((event.target as HTMLInputElement).value);
  };

  const handleUserEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
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

      const response = await fetch(`/api/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const successfulRsvp = await response.json();

      // will be false if no email match is found for user
      if (!successfulRsvp) {
        toast.error("Please sign up for the league before RSVPing");
        setRedirectToJoin(true);
      } else {
        // warning is correct. I want the orange alert to match color scheme
        toast.warning(successfulRsvp);
      }
    } catch (error) {
      toast.error("Oops something went wrong. Please try again later.");
    }
  };

  return (
    <>
      {redirectToJoin && <Redirect to="/join" />}
      <Box style={GlobalStyles.card}>
        <Box>
          <Typography align="center" variant="h4">
            Next game is TBD
          </Typography>
          <Typography align="center" variant="subtitle1">
            Game dates for the upcoming season will be announced soon.
          </Typography>
        </Box>
        <Typography align="center" variant="h5">
          Free to play and open to all!
        </Typography>
        <Box m={1}>
          <Typography align="center" variant="h6">
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
                onChange={handleRadioButtons}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio color="secondary" />}
                  label="Yes, I'll be there!"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="secondary" />}
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
                color="secondary"
              />
            </Box>
            <Typography variant="subtitle1">
              Please <Link to="/join">join</Link> the league before RSVP'ing
            </Typography>
            <Box>
              <Button
                type="submit"
                size="medium"
                variant="contained"
                color="secondary"
              >
                Submit
              </Button>
            </Box>
          </Box>
          <Box style={GlobalStyles.div}>
            <Typography align="center" variant="h5">
              We play at the Blunn Creek Greenbelt just south of Little Stacy Park
            </Typography>
            <Box m={2} id="map">
              <Map mapType={mapType} />
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default GameInfo;
