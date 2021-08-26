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
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      margin: "5%",
      marginTop: "5%",
      marginBottom: "10%",
    },
    headers: {
      padding: "2%",
    },
    table: {
      padding: "2%",
      overflow: "scroll",
    },
    closeModalButton: {
      padding: "3%",
    },
  })
);
