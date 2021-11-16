import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

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
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  // console.log(userDetails);
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Container>
        <Button
          component={Link}
          to="/admin/userlist"
          variant="text"
          sx={{ color: "343a40" }}
        >
          {" "}
          Go Back
        </Button>
        <Box sx={{ width: 600, margin: "20px auto" }}>
          <Typography variant="h3">Edit User</Typography>
          {loadingUpdate && <CircularProgress />}
          {errorUpdate && (
            <Alert severity="error">
              <AlertTitle>{errorUpdate}</AlertTitle>
            </Alert>
          )}
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          ) : (
            <Grid>
              <form onSubmit={submitHandler}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  type="text"
                  label="Name"
                  defaultValue={user.name}
                  variant="standard"
                  onChange={(e) => setName(e.target.value)}
                  sx={{ margin: "1rem 0" }}
                />
                <TextField
                  fullWidth
                  id="standard-basic"
                  type="email"
                  label="Email Address"
                  defaultValue={user.email}
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ margin: "1rem 0" }}
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                      />
                    }
                    label="Is Admin"
                  />
                </FormGroup>
                <Button
                  variant="contained"
                  type="submit"
                  style={{ backgroundColor: "#343a40", margin: "1rem 0" }}
                >
                  Update
                </Button>
              </form>
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default UserEditScreen;
