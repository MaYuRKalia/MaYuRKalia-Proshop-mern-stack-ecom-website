import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, AlertTitle } from "@mui/material";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <Box sx={{ p: 3 }}>
        <Container>
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to="/" className="btn btn-light">
              Go Back
            </Link>
          )}
          <h1>Latest Products</h1>
          {loading ? (
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">
              <AlertTitle>{error}</AlertTitle>
            </Alert>
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
                ))}{" "}
                <Paginate
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default HomeScreen;
