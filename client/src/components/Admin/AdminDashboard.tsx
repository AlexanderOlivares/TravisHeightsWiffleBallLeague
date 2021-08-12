import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import GlobalStyles from "../GlobalStyles";
// import SimpleModal from "./SimpleModal";
import { getModalStyle, useStyles } from "./modalUtils/ModalHelperFuncs";
import { Interface } from "readline";
import { string } from "yargs";
import { createNoSubstitutionTemplateLiteral } from "typescript";

// const useStyles = makeStyles({
// 	table: {
// 	  minWidth: 650,
// 	},
//   });
interface IUser {
  user_name: string;
  user_email: string;
  days_can_play: string[];
}

interface IRsvp {
  can_attend: boolean;
  user_email: string;
  date_submitted: string;
}

const AdminDashboard: React.FC = () => {
  const classes = useStyles();
  //   const [modalStyle] = React.useState(getModalStyle);
  const [openUsers, setOpenUsers] = React.useState<boolean>(false);
  const [openRsvp, setOpenRsvp] = React.useState<boolean>(false);
  const [subjectLine, setSubjectLine] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>("");
  const [userList, setUserList] = useState<IUser[]>();
  const [rsvpList, setRsvpList] = useState<IRsvp[]>();

  useEffect(() => {
    getUserList();
    getRsvpList();
  }, []);

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
    getUserList();
    setOpenUsers(true);
  };
  const openRsvpModal = () => {
    getRsvpList();
    setOpenRsvp(true);
  };

  const closeModal = () => {
    setOpenUsers(false);
    setOpenRsvp(false);
  };

  const getUserList = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users`, {
        method: "GET",
      });
      const parsedRes = await response.json();
      setUserList(parsedRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getRsvpList = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/rsvp`, {
        method: "GET",
      });
      const parsedRes = await response.json();
      setRsvpList(parsedRes);
      console.log(parsedRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  const userData = (
    <Box className={classes.paper}>
      <Box className={classes.headers}>
        <Typography variant="h4" id="user-list-modal">
          User List
        </Typography>
        <p id="number-of-users">{`Total Users: ${
          userList && userList.length
        }`}</p>
      </Box>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Days Can Play</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList &&
              userList.map((user, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {user.user_name}
                  </TableCell>
                  <TableCell align="left">{user.user_email}</TableCell>
                  <TableCell align="left">{user.days_can_play}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.closeModalButton} textAlign="center">
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={closeModal}
        >
          Close
        </Button>
      </Box>
    </Box>
  );

  const rsvpData = (
    <Box className={classes.paper}>
      <Box className={classes.headers}>
        <Typography variant="h4" id="rsvp-modal">
          RSVP List
        </Typography>
        <p id="number-of-rsvps">{`RSVP'd Yes: ${
          rsvpList && rsvpList.filter(rsvp => rsvp.can_attend).length
        }`}</p>
        <p id="number-of-rsvps">{`Total Responses: ${
          rsvpList && rsvpList.length
        }`}</p>
      </Box>
      {rsvpList && (
        <>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Can Attend</TableCell>
                  <TableCell align="left">Date Submitted</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rsvpList.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {user.user_email}
                    </TableCell>
                    <TableCell align="left">
                      {user.can_attend.toString()}
                    </TableCell>
                    <TableCell align="left">
                      {user.date_submitted.slice(0, 10)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className={classes.closeModalButton} textAlign="center">
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={closeModal}
            >
              Close
            </Button>
          </Box>
        </>
      )}
    </Box>
  );

  const sendLeagueEmail = async () => {
    try {
      const body = { subjectLine, emailBody };

      const response = await fetch(
        `http://localhost:5000/api/admin/email-league`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parsedRes = await response.json();

      console.log(parsedRes);
    } catch (error) {
      console.error(error.message);
    }
  };

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
          <Box p={1}>
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
        </Box>
        <Box m={3} textAlign="center">
          <Typography align="center" variant="h5">
            RSVPs
          </Typography>
          <Box p={1}>
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
            <Button
              onClick={sendLeagueEmail}
              size="medium"
              variant="contained"
              color="secondary"
            >
              Send Email
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal
        open={openUsers}
        onClose={closeModal}
        aria-labelledby="users"
        aria-describedby="user-modal"
      >
        {userData}
      </Modal>
      <Modal
        open={openRsvp}
        onClose={closeModal}
        aria-labelledby="rsvp"
        aria-describedby="rsvp-modal"
      >
        {rsvpData}
      </Modal>
    </>
  );
};

export default AdminDashboard;
