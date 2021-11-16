import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

import { Button, TextField, Box, Container, Stack } from "@mui/material";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const activeStep = 1;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <Box sx={{ p: 3, width: 700, margin: "20px auto" }}>
      <Container>
        <CheckoutSteps step1 step2 activeStep={activeStep} />
        <h1>Shipping</h1>
        <form onSubmit={submitHandler}>
          <Stack component="form" spacing={3}>
            <TextField
              multiline
              id="standard-basic"
              type="text"
              label="Address"
              value={address}
              required
              variant="standard"
              onChange={(e) => setAddress(e.target.value)}
              sx={{ margin: "1rem 0", maxWidth: "950px" }}
            />
            <TextField
              id="standard-basic"
              type="text"
              label="City"
              value={city}
              required
              variant="standard"
              onChange={(e) => setCity(e.target.value)}
              sx={{ margin: "1rem 0", maxWidth: "950px" }}
            />
            <TextField
              id="standard-basic"
              type="text"
              label="Postal Code"
              value={postalCode}
              variant="standard"
              required
              onChange={(e) => setPostalCode(e.target.value)}
              sx={{ margin: "1rem 0", maxWidth: "950px" }}
            />
            <TextField
              id="standard-basic"
              type="text"
              label="Country"
              value={country}
              variant="standard"
              required
              onChange={(e) => setCountry(e.target.value)}
              sx={{ margin: "1rem 0", maxWidth: "950px" }}
            />
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

export default ShippingScreen;
