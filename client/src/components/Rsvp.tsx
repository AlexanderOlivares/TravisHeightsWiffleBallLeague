import React, { useState } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import GlobalStyles from "./GlobalStyles";
import { toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import Map from "./Map";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";

interface IParams {
  id: string;
}

const Rsvp: React.FC = () => {
  const { id } = useParams<IParams>();
  const decodedEmail = atob(id);
  console.log(decodedEmail);

  const mapType: string = "hybrid";

  const [redirectToGameInfo, setRedirectToGameInfo] = useState<boolean>(false);
  const [rsvp, setRsvp] = useState<string>("true");

  const handleRadioButtons = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRsvp((event.target as HTMLInputElement).value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const RSVP_BOOL: boolean = rsvp === "true";

    try {
      const body: {
        decodedEmail: string;
        RSVP_BOOL: boolean;
      } = {
        decodedEmail,
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
        setRedirectToGameInfo(true);
      } else {
        // warning is correct. I want the orange alert to match color scheme
        toast.warning(successfulRsvp);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Oops something went wrong. Please try again later.");
    }
  };

  return (
    <>
      {redirectToGameInfo && <Redirect to="/gameinfo" />}
      <Box style={GlobalStyles.card}>
        <Box>
          <Typography align="center" variant="h3">
            Next Game is TBD
          </Typography>
        </Box>
        <Typography align="center" variant="h5">
          Free to play and open to all!
        </Typography>
        <Box m={1}>
          <Typography align="center" variant="h6">
            One-click RSVP
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
              We play at the Blunn Creek Greenbelt just south of Little Stacy
              Park
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

export default Rsvp;
