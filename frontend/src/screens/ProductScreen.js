import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  button: {
    color: "#343a40",
  },
}));

const ProductScreen = ({ history, match }) => {
  const classes = useStyles();

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <Container>
      <Box sx={{ p: 3 }}>
        <Button component={Link} to="/" variant="text">
          <div className={classes.button}>Go Back</div>
        </Button>
      </Box>
      {loading ? (
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box bgcolor="#FFB6C1" color="#A52A2A" p={1}>
          <p mb="none">{error}</p>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item md={6}>
            <img
              src={product.image}
              alt={product.name}
              className={classes.image}
            />
          </Grid>
          <Grid item md={3}>
            <List>
              <Box mb={2}>
                <ListItem alignItems="flex-start">
                  <h2>{product.name}</h2>
                </ListItem>
              </Box>
              <Divider variant="middle" />
              <ListItem>
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {product.rating}
                  <Rating
                    name="half-rating-read-product"
                    value={product.rating ? product.rating : 0}
                    precision={0.5}
                    readOnly
                  />
                  <Box sx={{ m: 1 }}>
                    {product.numReviews && product.numReviews}
                  </Box>
                  reviews
                </Box>
              </ListItem>
              <Divider variant="middle" />
              <ListItem>Price: ${product.price}</ListItem>
              <Divider variant="middle" />
              <ListItem>
                Description: {product.description ? product.description : null}
              </ListItem>
            </List>
          </Grid>
          <Divider variant="vertical" />
          <Grid item md={3}>
            <List>
              <ListItem>Price: ${product.price}</ListItem>
              <Divider variant="middle" />
              <ListItem>
                Status: {product.countInStock > 0 ? "In Stock" : "Out Stock"}
              </ListItem>
              <Divider variant="middle" />
              {product.countInStock > 0 && (
                <ListItem>
                  Qty
                  <div>
                    <FormControl
                      sx={{
                        m: 1,
                        minWidth: 120,
                        ml: 3,
                      }}
                    >
                      <Select
                        style={{ maxHeight: 35, minHeight: 0 }}
                        displayEmpty
                        value={qty}
                        input={<OutlinedInput />}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </ListItem>
              )}
              <ListItem>
                <Button
                  onClick={addToCartHandler}
                  variant="contained"
                  disabled={product.countInStock === 0}
                  style={{ backgroundColor: "#343a40" }}
                >
                  Add to Cart
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProductScreen;
