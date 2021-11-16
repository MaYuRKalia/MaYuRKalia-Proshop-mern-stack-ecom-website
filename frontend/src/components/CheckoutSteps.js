import React from "react";

import { Stepper, Step, StepLabel, Typography, Box } from "@mui/material";

const CheckoutSteps = ({ step1, step2, step3, step4, activeStep }) => {
  // const steps = ["Sign In", "Shipping", "Payment", "Place Order"];
  // const getSteps = () => {
  //   return
  // };

  // const handleNext = () => {
  //   setActiveStep((prevstep) => prevstep + 1);
  // };

  // const steps = getSteps();

  // const getStepsContent = (stepIndex) => {
  //   switch (stepIndex) {
  //     case 0:
  //       return <LoginScreen />;
  //     case 1:
  //       return <ShippingScreen />;
  //     case 2:
  //       return <PaymentScreen />;
  //     case 3:
  //       return <PlaceOrderScreen />;
  //     default:
  //       return "Unknown";
  //   }
  // };

  return (
    <Box sx={{ p: 3, width: 700, margin: "20px auto" }}>
      <>
        <Typography sx={{ p: 2 }} variant="h4">
          Checkout
        </Typography>
        <Stepper sx={{ p: 2 }} activeStep={activeStep} alternativeLabel>
          {step1 ? (
            <Step>
              <StepLabel>Sign In</StepLabel>
            </Step>
          ) : (
            <Step disabled>
              <StepLabel>Sign In</StepLabel>
            </Step>
          )}
          {step2 ? (
            <Step>
              <StepLabel>Shipping</StepLabel>
            </Step>
          ) : (
            <Step disabled>
              <StepLabel>Shipping</StepLabel>
            </Step>
          )}
          {step3 ? (
            <Step>
              <StepLabel>Payment</StepLabel>
            </Step>
          ) : (
            <Step disabled>
              <StepLabel>Payment</StepLabel>
            </Step>
          )}
          {step4 ? (
            <Step>
              <StepLabel>Place Order</StepLabel>
            </Step>
          ) : (
            <Step disabled>
              <StepLabel>Place Order</StepLabel>
            </Step>
          )}
        </Stepper>
      </>
    </Box>
  );
};

export default CheckoutSteps;
