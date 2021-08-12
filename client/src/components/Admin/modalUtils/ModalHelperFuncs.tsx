import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export function rand() {
  return Math.round(Math.random() * 20) - 10;
}

export function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      //   position: "absolute",
      //   position: "relative",
      //   minwidth: "300px",
      //   maxwidth: "90%",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      margin: "5%",
      marginTop: "15%",
      marginBottom: "5%",
      //   margin: "0 auto",
      //   padding: theme.spacing(2, 4, 3),
    },
    headers: {
      padding: "2%",
      //   margin: "2%",
    },
    table: {
      //   minWidth: "80vw",
      //   maxWidth: "80vw",
      //   margin: "15%",
    },
    closeModalButton: {
      padding: "3%",
    },
  })
);
