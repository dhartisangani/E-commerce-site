import {  Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textDecoration: "none",
      backgroundColor: "green",
      color: theme.palette.primary.contrastText,
      position: "relative",
      textAlign: "center",
      padding: "9px",
      "&:hover": {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.contrastText,
      },
    },
  })
);
const Confirmation = () => {
  const classes = useStyles();
  return (
    <Box m="90px auto" width="35%" height="25vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>Congrats on Making your Purchase</strong>
      </Alert>
      <Typography align="center" style={{marginTop:'15px'}}>
        <Link to={"/shop"} className={classes.button}>
          Continue Shopping
        </Link>
      </Typography>
    </Box>
  );
};

export default Confirmation;
