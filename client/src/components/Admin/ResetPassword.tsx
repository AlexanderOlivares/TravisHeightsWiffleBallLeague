import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField } from "@material-ui/core";

const ResetPassword: React.FC = () => {
  const [adminName, setAdminName] = useState<string>("");
  const [adminEmail, setAdminEmail] = useState<string>("");

  const getAdminNameAndEmail = async () => {
    let token = localStorage.getItem("token")?.split(".");
    if (token) {
      let admin = JSON.parse(atob(token[1]));
      setAdminName(admin.name);
      setAdminEmail(admin.email);
    }
  };

  useEffect(() => {
    getAdminNameAndEmail();
  }, []);

  return (
    <>
      <Box>
        <Typography align="center" variant="h4">
          {adminName || "Admin"} Password Reset
        </Typography>
        <Typography align="center" variant="h4">
          {adminEmail}
        </Typography>
        <Box textAlign="center" m={2}>
          <Box m={2}>
            <TextField
              // onChange={handleAdminCreds}
              required
              name="password"
              type="password"
              size="small"
              label="new password"
              variant="outlined"
              color="secondary"
            />
          </Box>
          <Box m={2}>
            <TextField
              // onChange={handleAdminCreds}
              required
              name="confirm password"
              type="password"
              size="small"
              label="confirm password"
              variant="outlined"
              color="secondary"
            />
          </Box>
          <Box>
            <Button
              // onClick={login}
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
    </>
  );
};

export default ResetPassword;
