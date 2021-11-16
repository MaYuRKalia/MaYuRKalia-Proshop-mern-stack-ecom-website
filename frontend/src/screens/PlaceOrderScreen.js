import React, { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";

import {
  Button,
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
} from "@mui/material";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Calculate prices
  const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success, order]);

  const placeorderHandker = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Box sx={{ p: 3, width: 700, margin: "20px auto 0 auto" }}>
        <Container>
          <CheckoutSteps step1 step2 step3 step4 activeStep={3} />
        </Container>
      </Box>
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
                    <strong>Address: </strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode}
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
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                  </Typography>
                }
              />
              <Divider variant="middle" />
              <List sx={{ p: 5 }} disablePadding>
                <Typography sx={{ pb: 1, letterSpacing: 3 }} variant="h5">
                  Order Items
                </Typography>
                {cart.cartItems.length === 0 ? (
                  <Alert severity="error">Your cart is empty</Alert>
                ) : (
                  <List>
                    {cart.cartItems.map((item, index) => (
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
                    <TableCell align="left">$ {cart.itemsPrice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Shipping
                    </TableCell>
                    <TableCell align="left">$ {cart.shippingPrice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tax
                    </TableCell>
                    <TableCell align="left">$ {cart.taxPrice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Total
                    </TableCell>
                    <TableCell align="left">$ {cart.totalPrice}</TableCell>
                  </TableRow>
                  <TableCell colSpan={4}>
                    {error && <Alert severity="error">{error}</Alert>}
                  </TableCell>
                </TableBody>
                <TableCell align="center" colSpan={4}>
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ backgroundColor: "#343a40" }}
                    disabled={cart.cartItems.length === 0}
                    onClick={placeorderHandker}
                  >
                    Place Order
                  </Button>
                </TableCell>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PlaceOrderScreen;
