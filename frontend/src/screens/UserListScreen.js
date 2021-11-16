import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listUsers, deleteUser } from "../actions/userActions";

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
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Container>
        <h1>Users</h1>
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
                  <TableCell component="th">NAME</TableCell>
                  <TableCell component="th">EMAIL</TableCell>
                  <TableCell component="th">ADMIN</TableCell>
                  <TableCell component="th"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell component="td">{user._id}</TableCell>
                    <TableCell component="td">{user.name}</TableCell>
                    <TableCell component="td">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </TableCell>
                    <TableCell component="td">
                      {user.isAdmin ? (
                        <CheckIcon sx={{ color: "green" }} />
                      ) : (
                        <ClearIcon sx={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell component="td">
                      <Stack spacing={1} direction="row">
                        <Button variant="outlined">
                          <Link to={`/admin/user/${user._id}/edit`}>
                            <EditIcon sx={{ color: "blue" }} />
                          </Link>
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <DeleteIcon sx={{ color: "red" }} />
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

export default UserListScreen;
