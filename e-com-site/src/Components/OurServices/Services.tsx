import React from "react";
import { motion } from "framer-motion";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import RecyclingIcon from "@mui/icons-material/Recycling";
import LockIcon from "@mui/icons-material/Lock";

interface ServiceBoxProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // backgroundColor: "#d5daf5",
      background: theme.palette.primary.light, // Set background color to secondary background color
      // color: "secondary.main",
      color: theme.palette.secondary.contrastText,
      height: "100%",
      paddingTop: "1%",
    },
  })
);

const ServiceBox: React.FC<ServiceBoxProps> = ({
  title,
  icon,
  description,
}) => {
  const classes = useStyles();
  return (
    <motion.div whileHover={{ scale: 1.1 }} className={classes.root} >
      <Box textAlign="center" >
        {icon}
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Box>
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <Box py={8}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <ServiceBox
            title="Free Shipping"
            icon={<LocalShippingIcon />}
            description="Get free shipping on orders over $50."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ServiceBox
            title="24/7 Customer Support"
            icon={<SupportAgentIcon />}
            description="We offer round-the-clock support to help you with any issues."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ServiceBox
            title="Easy Returns"
            icon={<RecyclingIcon />}
            description="If you're not satisfied with your purchase, you can easily return it."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ServiceBox
            title="Secure Payments"
            icon={<LockIcon />}
            description="Your payment information is secure with us."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Services;
