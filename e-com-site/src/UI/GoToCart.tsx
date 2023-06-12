import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
interface IProps {
  onClick: () => void;
  title: string;
  detail: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textDecoration: "none",
      border: "none",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      position: "relative",
      top: "5%",
      padding: "8px 20px 8px 20px",
      margin: "5px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.contrastText,
      },
    },
  })
);

const AddToCartButton: React.FC<IProps> = ({ onClick, title, detail }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCardOpen = () => {
    setIsOpen(true);
    onClick();
  };

  const handleCardClose = () => { 
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 1.2 }}
        className={classes.button}
        onClick={handleCardOpen}
      >
        {title}
      </motion.button>
      <Dialog open={isOpen} onClose={handleCardClose}>
        <DialogTitle>Go to Cart</DialogTitle>
        <DialogContent>
          <p>{detail}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCardClose}>Close</Button>
          <Button variant="contained" onClick={() => navigate("/cart")}>
            Go to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddToCartButton;
