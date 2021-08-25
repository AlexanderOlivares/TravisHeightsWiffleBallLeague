import React, { useState } from "react";
import { Box, Typography, Button, TextField, Modal } from "@material-ui/core";
import { toast } from "material-react-toastify";
import { useStyles } from "./modalUtils/ModalHelperFuncs";

interface IAdminCreds {
  email: string;
  password: string;
}

interface IProps {
  setAuth: () => void;
}

const AdminLogin: React.FC<IProps> = ({ setAuth }) => {
  const classes = useStyles();
  const [emailModal, setEmailModal] = React.useState<boolean>(false);
  const [emailForPassReset, setEmailForPassReset] = useState<string>("");
  const [userAndPass, setUserAndPass] = useState<IAdminCreds>({
    email: "",
    password: "",
  });

  const handleAdminCreds = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setUserAndPass(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const login = async () => {
    const { email, password } = userAndPass;
    try {
      const body: {
        email: string;
        password: string;
      } = {
        email,
        password,
      };

      const response = await fetch(`http://localhost:5000/api/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parsedRes = await response.json();
      const validToken = parsedRes.token;

      if (validToken) {
        localStorage.setItem("token", validToken);
        setAuth();
        toast.warning(`Welcome!`);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(`Error could not login. Username or password is incorrect`);
    }
  };

  const openEmailModal = (): void => setEmailModal(true);
  const closeEmailModal = (): void => setEmailModal(false);

  const captureEmailForPassReset = (
    Event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmailForPassReset(Event.target.value);
  };

  const sendPassResetEmail = async () => {
    try {
      const body = { emailForPassReset };
      console.log(body);
      const response = await fetch(
        `http://localhost:5000/api/admin/request-password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parsedRes = await response.json();
      toast.warning(parsedRes);
      closeEmailModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const renderEmailModal = (
    <Box className={classes.paper}>
      <Box textAlign="center" className={classes.headers}>
        <Typography variant="h4">Reset Password</Typography>
        <Typography variant="h6">
          {`
		  We'll send you a password reset email
       `}
        </Typography>
      </Box>
      <>
        <Box textAlign="center" m={2}>
          <TextField
            onChange={captureEmailForPassReset}
            required
            name="email"
            type="email"
            size="small"
            label="Email"
            variant="outlined"
            color="secondary"
          />
        </Box>
        <Box p={2} className={classes.closeModalButton} textAlign="center">
          <Button
            style={{ marginRight: "15px" }}
            type="button"
            variant="contained"
            color="secondary"
            onClick={sendPassResetEmail}
          >
            Send Email
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={closeEmailModal}
          >
            Cancel
          </Button>
        </Box>
      </>
    </Box>
  );

  return (
    <>
      <Box>
        <Typography align="center" variant="h3">
          Admin Login
        </Typography>
        <Box textAlign="center" m={2}>
          <Box m={2}>
            <TextField
              onChange={handleAdminCreds}
              required
              name="email"
              type="email"
              size="small"
              label="Email"
              variant="outlined"
              color="secondary"
            />
          </Box>
          <Box m={2}>
            <TextField
              onChange={handleAdminCreds}
              required
              name="password"
              type="password"
              size="small"
              label="password"
              variant="outlined"
              color="secondary"
            />
          </Box>
          <Button variant="text" color="primary" onClick={openEmailModal}>
            Reset Password
          </Button>
          <Box mt={2}>
            <Button
              onClick={login}
              type="submit"
              size="medium"
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal
        open={emailModal}
        onClose={closeEmailModal}
        aria-labelledby="password reset modal"
        // aria-describedby="password reset modal"
      >
        {renderEmailModal}
      </Modal>
    </>
  );
};

export default AdminLogin;
