import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";
import {
  Box,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Container,
  Stack,
  AlertTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    successDelete,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Box sx={{ p: 3 }}>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <h1>Products</h1>
          </Grid>
          <Grid item xs={3} mt={1}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#343a40" }}
              onClick={createProductHandler}
            >
              <AddIcon fontSize="small" /> Create Product
            </Button>
          </Grid>
        </Grid>
        {loadingDelete && <CircularProgress />}
        {errorDelete && (
          <Alert severity="error">
            <AlertTitle>{errorDelete}</AlertTitle>
          </Alert>
        )}
        {loadingCreate && <CircularProgress />}
        {errorCreate && (
          <Alert severity="error">
            <AlertTitle>{errorCreate}</AlertTitle>
          </Alert>
        )}
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell component="th">ID</TableCell>
                    <TableCell component="th">NAME</TableCell>
                    <TableCell component="th">PRICE</TableCell>
                    <TableCell component="th">CATEGORY</TableCell>
                    <TableCell component="th">BRAND</TableCell>
                    <TableCell component="th"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell component="td">{product._id}</TableCell>
                      <TableCell component="td">{product.name}</TableCell>
                      <TableCell component="td">${product.price}</TableCell>
                      <TableCell component="td">{product.category}</TableCell>
                      <TableCell component="td">{product.brand}</TableCell>
                      <TableCell component="td">
                        <Stack spacing={1} direction="row">
                          <Button variant="outlined">
                            <Link to={`/admin/product/${product._id}/edit`}>
                              <EditIcon
                                fontSize="small"
                                sx={{ color: "blue" }}
                              />
                            </Link>
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => deleteHandler(product._id)}
                          >
                            <DeleteIcon
                              fontSize="small"
                              sx={{ color: "red" }}
                            />
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </>
        )}
      </Container>
    </Box>
  );
};

export default ProductListScreen;
