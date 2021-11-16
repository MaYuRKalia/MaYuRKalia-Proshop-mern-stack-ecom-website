import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logout } from "../actions/userActions";

import { Route } from "react-router-dom";
import SearchBox from "./SearchBox";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    backgroundColor: "#343a40",
  },
  accordion: {
    zIndex: 1,
    elevation: "none",
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none",
    "& button": {
      color: "white",
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
  },
  navButtons: {
    justifyContent: "flex-end",
  },
  button: {
    color: "#d1d1d1",
    "&:hover": {
      color: "white",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };
  const logoutHandler = () => {
    dispatch(logout());
    handleClose();
  };

  const getUserDetailsHandler = () => {
    dispatch(getUserDetails());
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            <Button>PROSHOP</Button>
          </Typography>

          <Route render={({ history }) => <SearchBox history={history} />} />

          <Button
            component={Link}
            className={classes.button}
            to="/cart"
            justify="right"
          >
            <ShoppingCartIcon fontSize="medium" /> Cart
          </Button>

          {userInfo ? (
            <div>
              <Button
                id="basic-button"
                aria-controls="basic-menu1"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                style={{ color: "#d1d1d1" }}
              >
                {userInfo.name ? userInfo.name : ""}
              </Button>
              <Menu
                id="basic-menu1"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                style={{ color: "#343a40" }}
                classes={{ paper: classes.menuPaper }}
              >
                <MenuItem
                  onClick={getUserDetailsHandler}
                  component={Link}
                  to="/profile"
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button component={Link} className={classes.button} to="/login">
              <PersonIcon fontSize="medium" /> Sign In
            </Button>
          )}

          {userInfo && userInfo.isAdmin && (
            <div>
              <Button
                id="basic-button2"
                aria-controls="basic-menu2"
                aria-expanded={open2 ? "true" : undefined}
                onClick={(e) => setAnchorEl2(e.currentTarget)}
                style={{ color: "#d1d1d1" }}
              >
                {userInfo.isAdmin ? "Admin" : ""}
              </Button>
              <Menu
                id="admin-menu2"
                anchorEl={anchorEl2}
                open={open2}
                onClose={() => setAnchorEl2(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button2",
                }}
                style={{ color: "#343a40" }}
                classes={{ paper: classes.menuPaper }}
              >
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/admin/userList"
                >
                  Users
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/admin/productlist"
                >
                  Products
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/admin/orderlist"
                >
                  Orders
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
