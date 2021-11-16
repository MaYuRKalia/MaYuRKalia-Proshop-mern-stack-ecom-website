import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

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
import { Alert, AlertTitle, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

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
  const [rating, setRating] = useState(0);
  const [hover, setHover] = React.useState(-1);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
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
        <Alert severity="error">
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      ) : (
        <>
          <Meta title={product.name} />
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
                  Description:{" "}
                  {product.description ? product.description : null}
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
          <Grid container>
            <Grid item md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Alert severity="info">No Reviews</Alert>
              )}
              <List>
                {product.reviews.map((review) => (
                  <List key={review._id}>
                    <ListItem sx={{ padding: 0 }}>
                      <Typography variant="subtitle1">{review.name}</Typography>
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                      <Rating readOnly value={review.rating} />
                    </ListItem>
                    <ListItem sx={{ padding: 0 }}>
                      <Typography variant="caption">
                        {review.createdAt.substring(0, 10)}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography component="p" variant="subtitle2">
                        {review.comment}
                      </Typography>
                    </ListItem>
                    <Divider />
                  </List>
                ))}
                <ListItem sx={{ pl: 0 }}>
                  <h2>Write a Customer Review</h2>
                </ListItem>
                <ListItem>
                  {errorProductReview && (
                    <Alert severity="error">{errorProductReview}</Alert>
                  )}
                </ListItem>

                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <Grid container spacing={2} sx={{ pt: 0, pb: 2 }}>
                      <Grid item md={2}>
                        <Typography p={0} component="legend">
                          Rating
                        </Typography>
                      </Grid>
                      <Grid item md={3}>
                        <Rating
                          name="simple-controlled"
                          precision={0.5}
                          value={rating}
                          onChange={(e) => {
                            setRating(e.target.value);
                          }}
                          onChangeActive={(event, newHover) => {
                            setHover(newHover);
                          }}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />
                      </Grid>
                      <Grid item md={3}>
                        {rating !== null && (
                          <Box sx={{ ml: 2 }}>
                            {labels[hover !== -1 ? hover : rating]}
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                    <FormControl fullWidth sx={{ width: "25ch" }}>
                      <OutlinedInput
                        placeholder="Please write a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </FormControl>
                    <Box m={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        style={{ backgroundColor: "#343a40" }}
                      >
                        Submit
                      </Button>
                    </Box>
                  </form>
                ) : (
                  <Alert>
                    Please <Link to="/login">Sign in</Link> to write a review
                  </Alert>
                )}
              </List>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProductScreen;
