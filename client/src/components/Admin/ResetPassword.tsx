import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import { useParams, Redirect } from "react-router-dom";
import { toast } from "material-react-toastify";

interface IRouteParams {
  email: string;
  token: string;
}

interface INewPassword {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const params = useParams<IRouteParams>();
  const [adminName, setAdminName] = useState<string>("");
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [renderAdminLogin, setRenderAdminLogin] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<INewPassword>({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    getAdminNameAndEmailFromLocalStorage();
    getAdminEmailFromParams();
  }, []);

  const getAdminEmailFromParams = (): void => {
    if (params.email) {
      setAdminEmail(atob(params.email));
    }
  };

  const getAdminNameAndEmailFromLocalStorage = (): void => {
    let token = localStorage.getItem("token")?.split(".");
    if (token) {
      const admin = JSON.parse(atob(token[1]));
      setAdminName(admin.name);
      setAdminEmail(admin.email);
    }
  };

  const captureUpdatedPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setNewPassword(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const resetPassword = async () => {
    const body = newPassword;
    if (newPassword.password !== newPassword.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { token } = params;
      const resetToken: string = token ? token : "";
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      if (localStorage.getItem("token")) {
        myHeaders.append("token", localStorage.token);
      }

      const updatePassword = await fetch(
        `http://localhost:5000/api/admin/resetpassword/${adminEmail}/${resetToken}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );

      const parsedRes = await updatePassword.json();
      toast.warning(parsedRes);
      setRenderAdminLogin(true);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      {renderAdminLogin && <Redirect to="/admin" />}
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
              onChange={captureUpdatedPassword}
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
              onChange={captureUpdatedPassword}
              required
              name="confirmPassword"
              type="password"
              size="small"
              label="confirm password"
              variant="outlined"
              color="secondary"
            />
          </Box>
          <Box>
            <Button
              onClick={resetPassword}
              type="submit"
              size="medium"
              variant="contained"
              color="secondary"
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
