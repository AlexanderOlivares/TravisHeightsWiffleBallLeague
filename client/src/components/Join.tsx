import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import GlobalStyles from "./GlobalStyles";

export default function Join() {
  const [input, setInput] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [daysUserCanPlay, setDaysUserCanPlay] = useState<string[]>([]);
  const [checked, setChecked] = useState<Boolean>(false);

  const handleCheckboxes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: selectedDay, checked }: { value: string; checked: boolean } =
      event.target;

    setChecked(prev => !prev);

    checked
      ? setDaysUserCanPlay([...daysUserCanPlay, selectedDay])
      : setDaysUserCanPlay(daysUserCanPlay.filter(day => day !== selectedDay));
  };

  const handleNameAndEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log((event.target as HTMLInputElement).value);
    const { name, value }: { name: string; value: string } = event.target;
    // console.log(name, value);
    // setInput(prev => {
    //   return {
    //     ...prev,
    //     [name]: value,
    //   };
    // });
  };

  // console.log(input);

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
            size="small"
            label="Name"
            variant="outlined"
            onChange={handleNameAndEmail}
          />
        </Box>
        <Box m={2}>
          <TextField
            size="small"
            label="Email"
            variant="outlined"
            onChange={handleNameAndEmail}
          />
        </Box>
        <Box m={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <Typography align="center" variant="h6">
                Select daysUserCanPlay you can play
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
              <Typography align="center" variant="caption">
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
      </Box>
    </Box>
  );
}
