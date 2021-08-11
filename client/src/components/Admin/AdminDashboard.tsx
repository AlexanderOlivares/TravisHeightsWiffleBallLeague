import React, { useState } from "react";
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
import { getModalStyle, useStyles } from "./modalUtils/ModalHelperFuncs";

const AdminDashboard: React.FC = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [openUsers, setOpenUsers] = React.useState<boolean>(false);
  const [openRsvp, setOpenRsvp] = React.useState<boolean>(false);
  const [subjectLine, setSubjectLine] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>("");

  console.log(subjectLine);
  console.log(emailBody);

  const captureSubjectLine = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSubjectLine(event.target.value);
  };

  const captureEmailBody = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setEmailBody(event.target.value);
  };

  const openUserModal = () => {
    setOpenUsers(true);
  };
  const openRsvpModal = () => {
    setOpenRsvp(true);
  };

  const handleClose = () => {
    setOpenUsers(false);
    setOpenRsvp(false);
  };

  const userData = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">users modal :)</p>
      {/* <SimpleModal /> */}
    </div>
  );

  const rsvpData = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">rsvp modal duplicate</p>
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
            onClick={openUserModal}
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
            onClick={openRsvpModal}
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
              name="subject"
              label="Subject Line"
              variant="outlined"
              color="secondary"
              onChange={captureSubjectLine}
            />
          </Box>
          <Typography align="center" variant="h6">
            Email Body
          </Typography>
          <TextareaAutosize
            name="body"
            style={{ minWidth: "80vw" }}
            rowsMin={10}
            placeholder="Next game is..."
            defaultValue=""
            onChange={captureEmailBody}
          />
          <Box m={3} textAlign="center">
            <Button size="medium" variant="contained" color="secondary">
              Send Email
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal
        open={openUsers}
        onClose={handleClose}
        aria-labelledby="users"
        aria-describedby="user-modal"
      >
        {userData}
      </Modal>
      <Modal
        open={openRsvp}
        onClose={handleClose}
        aria-labelledby="rsvp"
        aria-describedby="rsvp-modal"
      >
        {rsvpData}
      </Modal>
    </>
  );
};

export default AdminDashboard;
