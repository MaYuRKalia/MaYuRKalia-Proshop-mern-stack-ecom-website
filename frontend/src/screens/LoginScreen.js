import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import CheckoutSteps from "../components/CheckoutSteps";

import {
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const activeStep = 0;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [redirect, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container>
      <Box sx={{ width: 600, margin: "20px auto" }}>
        {redirect === "shipping" && (
          <CheckoutSteps step1 activeStep={activeStep} />
        )}

        {error && (
          <Alert severity="error">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        {loading && (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        <Grid>
          <Typography variant="h3">Sign In</Typography>
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              id="standard-basic"
              type="email"
              label="Email Address"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
              sx={{ margin: "1rem 0" }}
            />
            <TextField
              fullWidth
              id="standard-basic"
              type="password"
              label="Password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
              sx={{ margin: "1rem 0" }}
            />
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#343a40", margin: "1rem 0" }}
            >
              Sign In
            </Button>
          </form>

          <Grid container>
            <Grid item>
              New Customer?{" "}
              <Link
                to={
                  redirect !== "/"
                    ? `/redirect?redirect=${redirect}`
                    : "/register"
                }
              >
                Register
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginScreen;
