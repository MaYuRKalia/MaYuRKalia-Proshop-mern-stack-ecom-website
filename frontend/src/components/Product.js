import React from "react";

import Card from "@material-ui/core/Card";
import { CardActionArea } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from "@mui/material/Rating";

import { useHistory } from "react-router-dom";

const Product = ({ product }) => {

  let history = useHistory();
  console.log(history, product.name);

  function navigateToProduct(id) {
    history.push(`/product/${id}`);
  }

  return (
    <Card onClick={() => navigateToProduct(product._id)} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Box m={2} p={2}>
          <CardMedia component="img" image={product.image} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Box m={2}>
            <Typography variant="body2" color="text.secondary">
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="half-rating-read"
                  defaultValue={product.rating}
                  precision={0.5}
                  readOnly
                />
                <Box sx={{ m: 1 }}>
                  {product.numReviews && product.numReviews}
                </Box>
                reviews
              </Box>
            </Typography>
          </Box>
          <Typography variant="h5">${product.price}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Product;
