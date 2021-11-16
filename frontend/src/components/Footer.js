import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    bottom: 0,
    position: "fixed",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Box pt={3}>
      <Grid container justifyContent="center" className={classes.footer}>
        Copyright &copy; ProShop
      </Grid>
    </Box>
  );
};

export default Footer;
