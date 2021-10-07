import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
  },
}));

const Header = () => {
  const classes = useStyles();

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
          <Button
            component={Link}
            className={classes.button}
            to="/cart"
            justify="right"
          >
            <i className="fas fa-shopping-cart"></i>
            Cart
          </Button>
          <Button component={Link} className={classes.button} to="/login">
            <i className="fas fa-user"></i>
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
