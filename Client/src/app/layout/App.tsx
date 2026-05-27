import React from "react";
import { Container } from "@mui/material";
import NavBar from "./NavBar";

import { Outlet } from "react-router";

function App(): React.ReactElement {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
