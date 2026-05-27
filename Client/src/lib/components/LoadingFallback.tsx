import { Box, Typography } from "@mui/material";
import React from "react";
import { GridLoader } from "react-spinners";
import { useTheme } from "@mui/material/styles";

interface Props {
  message: string;
}

function LoadingFallback({ message }: Props): React.ReactElement {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        minHeight: "100vh",
      }}
    >
      <GridLoader color={theme.palette.primary.main} size={16} />
      <Typography variant="h6" color="text.secondary">
        {message}...
      </Typography>
    </Box>
  );
}
export default LoadingFallback;
