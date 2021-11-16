import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

import {
  Grid,
  List,
  ListItem,
  Box,
  Container,
  MenuItem,
  Button,
  Card,
  IconButton,
} from "@mui/material";
import CardMedia from "@material-ui/core/CardMedia";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import DeleteIcon from "@mui/icons-material/Delete";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={8}>
            <h1>Shopping Cart</h1>

            {cartItems.length === 0 ? (
              <Card>
                <Box bgcolor="#99d6ff" color="#008ae6" p={1}>
                  <p>Your cart is empty</p>
                  <Link to="/">Go back</Link>
                </Box>
              </Card>
            ) : (
              <List>
                {cartItems.map((item) => (
                  <ListItem key={item.product}>
                    <Card sx={{ display: "flex", minHeight: "6rem" }}>
                      <Grid container spacing={3}>
                        <Grid item md={2}>
                          <CardMedia
                            sx={{
                              display: "flex",
                              maxHeight: 114,
                              maxWidth: 100,
                            }}
                            component="img"
                            image={item.image}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Link
                            sx={{ textDecoration: "none" }}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Grid>
                        <Grid item md={2}>
                          ${item.price}
                        </Grid>
                        <Grid item md={3}>
                          <Box>
                            <FormControl
                              sx={{
                                m: 1,
                                minWidth: 120,
                                ml: 3,
                                display: "flex",
                              }}
                            >
                              <Select
                                style={{ maxHeight: 35, minHeight: 0 }}
                                displayEmpty
                                value={item.qty}
                                input={<OutlinedInput />}
                                onChange={(e) =>
                                  dispatch(
                                    addToCart(
                                      item.product,
                                      Number(e.target.value)
                                    )
                                  )
                                }
                              >
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                    <MenuItem key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item mg={2}>
                          <Box>
                            <IconButton
                              sx={{
                                display: "flex",
                              }}
                              type="button"
                              variant="light"
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
          <Grid item md={4}>
            <Card>
              <List>
                <ListItem>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)})Items
                  </h2>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#343a40" }}
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to checkout
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartScreen;
