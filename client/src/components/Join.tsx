import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import GlobalStyles from "./GlobalStyles";
import { toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

export default function Join() {
  interface UserTextInput {
    name: string;
    email: string;
  }

  const [nameAndEmail, setNameAndEmail] = useState<UserTextInput>({
    name: "",
    email: "",
  });

  const [daysUserCanPlay, setDaysUserCanPlay] = useState<string[]>([]);
  // eslint-disable-next-line
  const [checked, setChecked] = useState<Boolean>(false);
  const [userJoined, setUserJoined] = useState<Boolean>(false);

  const handleCheckboxes = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value: selectedDay, checked }: { value: string; checked: boolean } =
      event.target;

    setChecked(Boolean);

    checked
      ? setDaysUserCanPlay([...daysUserCanPlay, selectedDay])
      : setDaysUserCanPlay(daysUserCanPlay.filter(day => day !== selectedDay));
  };

  const handleNameAndEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value }: { name: string; value: string } = event.target;
    setNameAndEmail(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email }: { name: string; email: string } = nameAndEmail;
    try {
      const body: {
        name: string;
        email: string;
        daysUserCanPlay: string[];
      } = {
        name,
        email,
        daysUserCanPlay,
      };

      const response = await fetch(`http://localhost:5000/api/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      setUserJoined(true);
      toast.warning(await response.json());
    } catch (error) {
      console.error(error.message);
      toast.error("Oops something went wrong. Please try again later.");
    }
  };

  return (
    <>
      {userJoined && <Redirect to="/gameinfo" />}
      <Box style={GlobalStyles.card}>
        <Box>
          <Typography align="center" variant="h3">
            Join The League
          </Typography>
          <Typography align="center" variant="h6">
            Free to play and open to all!
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box m={2} textAlign="center">
            <Box m={2}>
              <TextField
                required
                size="small"
                name="name"
                variant="outlined"
                color="secondary"
                label="name"
                onChange={handleNameAndEmail}
              />
            </Box>
            <Box m={2}>
              <TextField
                required
                type="email"
                size="small"
                name="email"
                color="secondary"
                variant="outlined"
                label="email"
                onChange={handleNameAndEmail}
              />
            </Box>
            <Box m={2}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <Typography align="center" variant="h6">
                    Select days you're available
                  </Typography>
                </FormLabel>
                <br></br>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <FormGroup aria-label="position" row={true}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={"Any"}
                          onChange={handleCheckboxes}
                          color="secondary"
                        />
                      }
                      label="Any"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={"Mon"}
                          onChange={handleCheckboxes}
                          color="secondary"
                        />
                      }
                      label="Mon"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={"Tues"}
                          onChange={handleCheckboxes}
                          color="secondary"
                        />
                      }
                      label="Tue"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={"Wed"}
                          onChange={handleCheckboxes}
                          color="secondary"
                        />
                      }
                      label="Wed"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={"Thur"}
                          onChange={handleCheckboxes}
                          color="secondary"
                        />
                      }
                      label="Thur"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={"Fri"}
                          onChange={handleCheckboxes}
                          color="secondary"
                        />
                      }
                      label="Fri"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={"Sat"}
                          onChange={handleCheckboxes}
                          color="secondary"
                        />
                      }
                      label="Sat"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={"Sun"}
                          onChange={handleCheckboxes}
                          color="secondary"
                        />
                      }
                      label="Sun"
                      labelPlacement="top"
                    />
                  </FormGroup>
                </Box>
                <Box m={2} px="10%">
                  <Typography align="center" variant="subtitle2">
                    At the moment games are usually Sunday mornings or Sunday
                    evenings. We are thinking about adding games on Saturdays or
                    weeknights depending on availability.
                  </Typography>
                </Box>
              </FormControl>
            </Box>
            <Box m={3}>
              <Button
                type="submit"
                size="medium"
                variant="contained"
                color="secondary"
              >
                Join The League
              </Button>
            </Box>
            <Box m={2}>
              <Typography variant="caption">
                We will only email you about games and league information.
              </Typography>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
