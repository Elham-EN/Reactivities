import { Container, Typography } from "@mui/material";
import React from "react";

export default function HomePage(): React.ReactElement {
  return (
    <Container sx={{ padding: 3 }}>
      <Typography variant="h2">Home Page</Typography>
    </Container>
  );
}
