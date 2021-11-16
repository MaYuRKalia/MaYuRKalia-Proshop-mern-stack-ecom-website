import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

import {
  Button,
  Box,
  TextField,
  Grid,
  CircularProgress,
  Container,
  Alert,
  AlertTitle,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user?.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Container>
        <Grid container spacing={8}>
          <Grid item md={3}>
            <h1>User Profile</h1>
            {message && (
              <Alert severity="error">
                <AlertTitle>{message}</AlertTitle>
              </Alert>
            )}
            {error && (
              <Alert severity="error">
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
            {success && (
              <Alert severity="success">
                <AlertTitle>Profile Updated</AlertTitle>
              </Alert>
            )}
            {loading ? (
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid>
                <form onSubmit={submitHandler}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    type="name"
                    label="Name"
                    value={name ? name : ""}
                    variant="standard"
                    onChange={(e) => setName(e.target.value)}
                    sx={{ margin: "1rem 0" }}
                  />
                  <TextField
                    fullWidth
                    id="standard-basic"
                    type="email"
                    value={email ? email : ""}
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
                    Update
                  </Button>
                </form>
              </Grid>
            )}
          </Grid>
          <Grid item md={9}>
            <h1>My Orders</h1>
            {loadingOrders ? (
              <CircularProgress />
            ) : errorOrders ? (
              <Alert severity="error">{errorOrders}</Alert>
            ) : (
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell component="th" align="left">
                        ID
                      </TableCell>
                      <TableCell component="th" align="left">
                        DATE
                      </TableCell>
                      <TableCell component="th" align="left">
                        TOTAL
                      </TableCell>
                      <TableCell component="th" align="left">
                        PAID
                      </TableCell>
                      <TableCell component="th" align="left">
                        DELIVERED
                      </TableCell>
                      <TableCell component="th" align="centre"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell component="td" align="left">
                          {order._id}
                        </TableCell>
                        <TableCell component="td" align="left">
                          {order.createdAt.substring(0, 10)}
                        </TableCell>
                        <TableCell component="td" align="left">
                          {order.totalPrice}
                        </TableCell>
                        <TableCell component="td" align="left">
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <ClearIcon sx={{ color: "red" }} />
                          )}
                        </TableCell>
                        <TableCell component="td" align="left">
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <ClearIcon sx={{ color: "red" }} />
                          )}
                        </TableCell>
                        <TableCell component="td" align="left">
                          <Link to={`/order/${order._id}`}>
                            <Button variant="outlined">Details</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfileScreen;
