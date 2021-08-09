import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@material-ui/core";

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
