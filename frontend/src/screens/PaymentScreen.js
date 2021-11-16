import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

import {
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Box,
  Container,
  Stack,
} from "@mui/material";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const activeStep = 2;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <Box sx={{ p: 3, width: 700, margin: "20px auto" }}>
      <Container>
        <CheckoutSteps step1 step2 step3 activeStep={activeStep} />
        <h1>Payment Method</h1>
        <form onSubmit={submitHandler}>
          <Stack component="form" spacing={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select Payment Method</FormLabel>
              <RadioGroup aria-label="payment" name="radio-buttons-group">
                <FormControlLabel
                  value="PayPal"
                  control={<Radio />}
                  label="PayPal or Credit Card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          <Button
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#343a40", margin: "1rem 0" }}
          >
            Continue
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default PaymentScreen;
