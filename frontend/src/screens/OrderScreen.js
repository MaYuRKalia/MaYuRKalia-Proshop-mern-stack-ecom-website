import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { PayPalButton } from "react-paypal-button-v2";

import {
  Grid,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading) {
    // Calculate prices
    const addDecimals = (num) => {
      return Math.round((num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, history, orderId, successPay, order, successDeliver, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box sx={{ p: 3 }}>
          <h1>Order {order._id}</h1>
          <Container>
            <Grid container spacing={3}>
              <Grid item md={8}>
                <List disablePadding>
                  <ListItemText
                    sx={{ pl: 5, pb: 2, pt: 2 }}
                    primary={
                      <Typography sx={{ pb: 1, letterSpacing: 3 }} variant="h5">
                        Shipping
                      </Typography>
                    }
                    secondary={
                      <Typography>
                        <p>
                          <strong>Name: </strong> {order.user.name}
                        </p>
                        <p>
                          <strong>Email: </strong>
                          <a href={`mailto:${order.user.email}`}>
                            {order.user.email}
                          </a>
                        </p>
                        <p>
                          <strong>Address: </strong>
                          {order.shippingAddress.address},{" "}
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.postalCode}
                        </p>
                        {order.isDelivered ? (
                          <Alert severity="success">
                            Delivered on {order.deliveredAt}
                          </Alert>
                        ) : (
                          <Alert severity="error">Not Delivered</Alert>
                        )}
                      </Typography>
                    }
                  />
                  <Divider variant="middle" />
                  <ListItemText
                    sx={{ pl: 5, pb: 2, pt: 2 }}
                    primary={
                      <Typography sx={{ pb: 1, letterSpacing: 3 }} variant="h5">
                        Payment method
                      </Typography>
                    }
                    secondary={
                      <Typography>
                        <p>
                          <strong>Method: </strong>
                          {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                          <Alert severity="success">
                            Paid on {order.paidAt}
                          </Alert>
                        ) : (
                          <Alert severity="error">Not Paid</Alert>
                        )}
                      </Typography>
                    }
                  />
                  <Divider variant="middle" />
                  <List sx={{ p: 5 }} disablePadding>
                    <Typography sx={{ pb: 1, letterSpacing: 3 }} variant="h5">
                      Order Items
                    </Typography>
                    {order.orderItems.length === 0 ? (
                      <Alert severity="error">Order is empty</Alert>
                    ) : (
                      <List>
                        {order.orderItems.map((item, index) => (
                          <ListItem>
                            <Card
                              sx={{
                                display: "flex",
                                maxHeight: 114,
                                minWidth: 700,
                              }}
                            >
                              <Grid item md={2}>
                                <CardMedia
                                  component="img"
                                  image={item.image}
                                  alt={item.name}
                                  // sx={{ height: 70, width: 85 }}
                                />
                              </Grid>
                              <Grid item md={6}>
                                <CardContent>
                                  <Link to={`/product/${item.product}`}>
                                    {item.name}
                                  </Link>
                                </CardContent>
                              </Grid>
                              <Grid item md={4}>
                                <CardContent>
                                  {item.qty} x {item.price} = $
                                  {item.qty * item.price}
                                </CardContent>
                              </Grid>
                            </Card>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </List>
                </List>
              </Grid>
              <Grid item md={4}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableCell align="center" colSpan={4}>
                      <Typography variant="h5" sx={{ p: 1, letterSpacing: 3 }}>
                        Order Summary
                      </Typography>
                    </TableCell>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Items
                        </TableCell>
                        <TableCell align="left">$ {order.itemsPrice}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Shipping
                        </TableCell>
                        <TableCell align="left">
                          $ {order.shippingPrice}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Tax
                        </TableCell>
                        <TableCell align="left">$ {order.taxPrice}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Total
                        </TableCell>
                        <TableCell align="left">$ {order.totalPrice}</TableCell>
                      </TableRow>
                    </TableBody>
                    {!order.isPaid && (
                      <TableCell align="center" colSpan={4}>
                        {loadingPay && <CircularProgress />}
                        {!sdkReady ? (
                          <CircularProgress />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </TableCell>
                    )}
                    {loadingDeliver && <CircularProgress />}
                    {userInfo &&
                      userInfo.isAdmin &&
                      order.isPaid &&
                      !order.isDelivered && (
                        <TableCell align="center" colSpan={4}>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "#343a40" }}
                            onClick={deliverHandler}
                          >
                            Mark as Delivered
                          </Button>
                        </TableCell>
                      )}
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default OrderScreen;
