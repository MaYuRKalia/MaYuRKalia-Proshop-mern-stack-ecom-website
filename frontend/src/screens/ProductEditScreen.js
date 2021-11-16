import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductDetails, updateProduct } from "../actions/productActions";

import {
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setImage(product.category);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, product, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Container>
        <Button
          component={Link}
          to="/admin/productlist"
          variant="text"
          sx={{ color: "343a40" }}
        >
          {" "}
          Go Back
        </Button>
        <Box sx={{ width: 600, margin: "20px auto" }}>
          <Typography variant="h3">Edit Product</Typography>
          {loadingUpdate && <CircularProgress />}
          {errorUpdate && (
            <Alert severity="error">
              <AlertTitle>{errorUpdate}</AlertTitle>
            </Alert>
          )}
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          ) : (
            <Grid>
              <form onSubmit={submitHandler}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  type="text"
                  label="Name"
                  helperText="Enter name"
                  defaultValue={name}
                  variant="standard"
                  onChange={(e) => setName(e.target.value)}
                  sx={{ margin: "1rem 0" }}
                />
                <TextField
                  fullWidth
                  id="standard-basic"
                  type="number"
                  label="Price"
                  helperText="Enter price"
                  defaultValue={price}
                  variant="standard"
                  onChange={(e) => setPrice(e.target.value)}
                  sx={{ margin: "1rem 0" }}
                />
                <TextField
                  fullWidth
                  id="standard-basic"
                  type="text"
                  label="Image"
                  helperText="Enter Image url"
                  defaultValue={setImage}
                  variant="standard"
                  onChange={(e) => setImage(e.target.value)}
                  sx={{ margin: "1rem 0" }}
                />
                <Button
                  variant="contained"
                  component="label"
                  onChange={uploadFileHandler}
                  style={{ backgroundColor: "#343a40", margin: "1rem 0" }}
                >
                  Choose File
                  <input type="file" accept="image/*" hidden />
                </Button>
                {uploading && <CircularProgress />}
                <TextField
                  fullWidth
                  id="standard-basic"
                  type="text"
                  label="Brand"
                  helperText="Enter brand"
                  defaultValue={brand}
                  variant="standard"
                  onChange={(e) => setBrand(e.target.value)}
                  sx={{ margin: "1rem 0" }}
                />
                <TextField
                  fullWidth
                  id="standard-basic"
                  type="number"
                  label="Count In Stock"
                  helperText="Enter Count in stock"
                  defaultValue={countInStock}
                  variant="standard"
                  onChange={(e) => setCountInStock(e.target.value)}
                  sx={{ margin: "1rem 0" }}
                />
                <TextField
                  fullWidth
                  id="standard-basic"
                  type="text"
                  label="Category"
                  helperText="Enter category"
                  defaultValue={category}
                  variant="standard"
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{ margin: "1rem 0" }}
                />
                <TextField
                  fullWidth
                  id="standard-basic"
                  type="text"
                  label="Description"
                  helperText="Enter description"
                  defaultValue={description}
                  variant="standard"
                  onChange={(e) => setDescription(e.target.value)}
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
        </Box>
      </Container>
    </Box>
  );
};

export default ProductEditScreen;
