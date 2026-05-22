import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import theme from "./app/layout/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode="light" noSsr>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
