import { useState } from "react";
import { Typography, Box, Button, TextField } from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import { ToastContainer, toast } from "material-react-toastify";

const Unsubscribe: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const captureEmailText = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail((event.target as HTMLInputElement).value);
  };

  const unsubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const body: {
        email: string;
      } = {
        email,
      };

      const response = await fetch(`http://localhost:5000/api/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      toast.success(await response.json());
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Box textAlign="center" style={GlobalStyles.card}>
      <Box m={3}>
        <Typography align="center" variant="h4">
          Are you sure you want to unsubscribe?
        </Typography>
      </Box>
      <form onSubmit={unsubscribe}>
        <Box m={2}>
          <TextField
            onChange={captureEmailText}
            required
            type="email"
            size="small"
            label="Email"
            variant="outlined"
          />
        </Box>
        <Typography align="center">
          Enter your email to be removed from our list.
        </Typography>
        <Box m={2}>
          <Button
            type="submit"
            size="medium"
            variant="contained"
            color="primary"
          >
            Unsubscribe
          </Button>
        </Box>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    </Box>
  );
};

export default Unsubscribe;
