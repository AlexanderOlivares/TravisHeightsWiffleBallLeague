import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import { toast } from "material-react-toastify";

interface AdminCreds {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const [userAndPass, setUserAndPass] = useState<AdminCreds>({
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
        // set auth status here
        toast.warning(`Welcome!`);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(`Error could not login. Username or password is incorrect`);
    }
  };

  return (
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
        <Box>
          <Button
            onClick={login}
            type="submit"
            size="medium"
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLogin;
