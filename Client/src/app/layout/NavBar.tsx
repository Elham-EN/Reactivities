import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Switch,
  useColorScheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState, type ChangeEvent } from "react";

const navLinks = ["Activities", "Profile"];

export default function NavBar(): React.ReactElement {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, setMode } = useColorScheme();

  const label = { slotProps: { input: { "aria-label": "dark-mode" } } };

  const handleDarkMode = (event: ChangeEvent<HTMLInputElement>): void => {
    setMode(event.target.checked ? "dark" : "light");
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          backdropFilter: "blur(12px)",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar>
          {/* Logo — always visible */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            {/* Hamburger — mobile only */}
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{
                mr: 1,
                color: "text.primary",
                display: { xs: "flex", md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: "text.primary",
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              Reactivities
            </Typography>
            <Switch {...label} onChange={handleDarkMode} checked={mode === "dark"} />
            {/* Desktop nav links — hidden on mobile */}
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 4, gap: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link}
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    textTransform: "none",
                  }}
                >
                  {link}
                </Button>
              ))}
            </Box>
          </Box>
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Create Activity
          </Button>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 240, pt: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItemButton key={link} onClick={() => setDrawerOpen(false)}>
                <ListItemText primary={link} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
