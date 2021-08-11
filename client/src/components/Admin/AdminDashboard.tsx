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

// const useStyles = makeStyles({
// 	table: {
// 	  minWidth: 650,
// 	},
//   });
interface UserInfo {
  user_name: string;
  user_email: string;
  days_can_play: string[];
}

const AdminDashboard: React.FC = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [openUsers, setOpenUsers] = React.useState<boolean>(false);
  const [openRsvp, setOpenRsvp] = React.useState<boolean>(false);
  const [subjectLine, setSubjectLine] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>("");
  const [userList, setUserList] = useState<UserInfo[]>();

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

  const handleClose = () => {
    setOpenUsers(false);
    setOpenRsvp(false);
  };

  useEffect(() => {
    getUserList();
  }, []);

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
  console.log(userList);

  const getRsvpList = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/rsvp`, {
        method: "GET",
      });
      const parsedRes = await response.json();
      console.log(parsedRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  const userData = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="user-list-modal">User List</h2>
      <p id="number-of-users">{`Total Users: ${
        userList && userList.length
      }`}</p>
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
                  {/* <TableCell align="right">{user.user_name}</TableCell> */}
                  <TableCell align="left">{user.days_can_play}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  const rsvpData = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">RSVP List</h2>
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
