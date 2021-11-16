import React from "react";

import { Container, Grid } from "@material-ui/core";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Grid
        container
        spacing={0}
        justify="center"
        direction="row"
        xs={12}
        md={6}
      >
        {children}
      </Grid>
    </Container>
  );
};

export default FormContainer;
