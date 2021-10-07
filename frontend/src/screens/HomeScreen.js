import React, { useEffect } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CircularProgress from "@mui/material/CircularProgress";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Container>
        <h1>Latest Products</h1>
        {loading ? (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box bgcolor="#FFB6C1" color="#A52A2A" p={1}>
            <p mb="none">{error}</p>
          </Box>
        ) : (
          <Box>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid
                  item
                  key={product._id}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={3}
                  xl={3}
                >
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HomeScreen;
