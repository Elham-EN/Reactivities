import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  message: string;
}

function LoadingFallback({ message }: Props): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4">{message}...</Typography>
    </Box>
  );
}
export default LoadingFallback;
