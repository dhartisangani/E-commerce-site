import React, { useState } from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Payment from "../Components/CheckOut/Payment";
import { Button, Grid } from "@mui/material";
import Helmet from "../Components/Helmet/Helmet";
import Confirmation from "../Components/CheckOut/Confirmation";
import AddressData from "../Components/CheckOut/AddressData";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

const Checkout: React.FC = () => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getSteps() {
    return ["Step 1", "Step 2", "Step 3"];
  }

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return <AddressData onNext={handleNext} />;
      case 1:
        return <Payment onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <Confirmation />;
    }
  }

  const steps = getSteps();

  return (
    <Helmet title={"checkout"}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container spacing={1} mb={5} mt={5} justifyContent="space-between">
        <Grid item xs={12} md={12} sm={12} container justifyContent="center">
          {activeStep === steps.length ? (
            <div>
              <p>All steps completed</p>
              <Button onClick={handleReset}>Reset </Button>
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>
                {getStepContent(activeStep)}
              </div>
            </div>
          )}
        </Grid>

        {/* </div> */}
      </Grid>
    </Helmet>
  );
};

export default Checkout;
