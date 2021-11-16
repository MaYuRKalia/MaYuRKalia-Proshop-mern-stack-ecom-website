import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listOrders } from "../actions/orderActions";

import {
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Container,
  Stack,
  Box,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <Box sx={{ p: 3 }}>
      <Container>
        <h1>Orders</h1>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th">ID</TableCell>
                  <TableCell component="th">USER</TableCell>
                  <TableCell component="th">DATE</TableCell>
                  <TableCell component="th">TOTAL</TableCell>
                  <TableCell component="th">PAID</TableCell>
                  <TableCell component="th">DELIVERED</TableCell>
                  <TableCell component="th"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell component="td">{order._id}</TableCell>
                    <TableCell component="td">
                      {order.user && order.user.name}
                    </TableCell>
                    <TableCell component="td">
                      {order.createdAt.substring(0, 10)}
                    </TableCell>
                    <TableCell component="td">${order.totalPrice}</TableCell>
                    <TableCell component="td">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <ClearIcon sx={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell component="td">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <ClearIcon sx={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell component="td">
                      <Stack spacing={1} direction="row">
                        <Button variant="outlined">
                          <Link to={`/order/${order._id}`}>Details</Link>
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
};

export default OrderListScreen;
