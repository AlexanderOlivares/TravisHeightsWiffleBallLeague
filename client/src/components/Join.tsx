import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import GlobalStyles from "./GlobalStyles";

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
  const [checked, setChecked] = useState<Boolean>(false);

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
          <TextField
            required
            size="small"
            name="name"
            variant="outlined"
            onChange={handleNameAndEmail}
          />
        </Box>
        <Box m={2}>
          <TextField
            required
            size="small"
            name="email"
            variant="outlined"
            onChange={handleNameAndEmail}
          />
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
                  control={
                    <Checkbox
                      value={"Any"}
                      onChange={handleCheckboxes}
                      color="primary"
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
                      color="primary"
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
                      color="primary"
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
                      color="primary"
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
                      color="primary"
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
                      color="primary"
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
                      color="primary"
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
                      color="primary"
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
          <Button size="medium" variant="contained" color="primary">
            Join The League
          </Button>
        </Box>
        <Box m={2}>
          <Typography variant="caption">
            We will only email you about games and league information.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
