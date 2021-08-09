import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
  Modal,
} from "@material-ui/core";
import GlobalStyles from "../GlobalStyles";
// import SimpleModal from "./SimpleModal";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      minWidth: 300,
      maxWidth: "90vw",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const AdminHome: React.FC = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState<boolean>(false);
  //   const [activeModal, setActiveModal] = React.useState<HTMLElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">same modal :)</p>
      {/* <SimpleModal /> */}
    </div>
  );

  const body1 = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">same modal duplicate</p>
      {/* <SimpleModal /> */}
    </div>
  );

  return (
    <>
      <Box style={GlobalStyles.card}>
        <Box>
          <Typography align="center" variant="h3">
            Admin Dashboard
          </Typography>
        </Box>
        <Box m={3} textAlign="center">
          <Typography align="center" variant="h5">
            League Members
          </Typography>
          <Button
            id="users"
            onClick={handleOpen}
            size="medium"
            variant="contained"
            color="secondary"
          >
            View
          </Button>
        </Box>
        <Box m={3} textAlign="center">
          <Typography align="center" variant="h5">
            RSVPs
          </Typography>
          <Button
            id="rsvp"
            onClick={handleOpen}
            size="medium"
            variant="contained"
            color="secondary"
          >
            View
          </Button>
        </Box>
        <Box textAlign="center" p={2} m={3}>
          <Typography align="center" variant="h4">
            Email League
          </Typography>
          <Box m={2}>
            <TextField
              style={{ minWidth: "60vw" }}
              name="message"
              label="Subject Line"
              variant="outlined"
              color="secondary"
            />
          </Box>
          <Typography align="center" variant="h6">
            Email Body
          </Typography>
          <TextareaAutosize
            style={{ minWidth: "80vw" }}
            rowsMin={10}
            placeholder="Next game is..."
            defaultValue=""
          />
          <Box m={3} textAlign="center">
            <Button size="medium" variant="contained" color="secondary">
              Send Email
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default AdminHome;
