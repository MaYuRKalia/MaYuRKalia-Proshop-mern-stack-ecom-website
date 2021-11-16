import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";

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

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      console.log(register);
      history.push(redirect);
    }
  }, [redirect, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Container>
      <Box sx={{ width: 600, margin: "20px auto" }}>
        {message && (
          <Box bgcolor="#FFB6C1" color="#A52A2A" p={1}>
            <p mb="none">{message}</p>
          </Box>
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
          <Typography variant="h3">Sign Up</Typography>
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              id="standard-basic"
              type="name"
              label="Name"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
              sx={{ margin: "1rem 0" }}
            />
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
            <TextField
              fullWidth
              id="standard-basic"
              type="password"
              label="Confirm Password"
              variant="standard"
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ margin: "1rem 0" }}
            />
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#343a40", margin: "1rem 0" }}
            >
              Register
            </Button>
          </form>

          <Grid container>
            <Grid item>
              Have an Account?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                Log In
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RegisterScreen;
