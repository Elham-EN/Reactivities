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
import { NavLink } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";

const navLinks = [
  { name: "Activities", path: "activities", end: true },
  { name: "Create Activity", path: "activities/create", end: false },
];

export default function NavBar(): React.ReactElement {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, setMode } = useColorScheme();
  const { currentUser } = useAccount();

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
              component={NavLink}
              to="/"
              sx={{
                color: "text.primary",
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                lineHeight: 1,
                textDecoration: "none",
              }}
            >
              Reactivities
            </Typography>
            <Switch
              {...label}
              onChange={handleDarkMode}
              checked={mode === "dark"}
            />
            {/* Desktop nav links — hidden on mobile */}
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 4, gap: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  component={NavLink}
                  to={`/${link.path}`}
                  end={link.end}
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    textTransform: "none",
                    "&.active": { color: "primary.main", fontWeight: 700 },
                  }}
                >
                  {link.name}
                </Button>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {currentUser ? (
              <Typography>Welcome {currentUser.displayName}</Typography>
            ) : (
              <Button
                variant="contained"
                sx={{ textTransform: "none" }}
                component={NavLink}
                to="/account/login"
              >
                Login
              </Button>
            )}
          </Box>
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
              <ListItemButton
                key={link.name}
                component={NavLink}
                to={`/${link.path}`}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.name} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
