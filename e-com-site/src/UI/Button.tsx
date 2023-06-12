import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: theme.palette.primary.contrastText,
      background: theme.palette.primary.main,
    },
  })
);

type Props = ButtonProps & {
  // Add any additional props that you need
};

const CustomButton: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const classes = useStyles();

  return (
    <Button className={classes.button} {...rest}>
      {children}
    </Button>
  );
};

export default CustomButton;
