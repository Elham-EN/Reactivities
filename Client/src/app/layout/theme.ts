import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
  },
  defaultColorScheme: "light",
  colorSchemes: {
    light: {
      palette: {
        // Buttons, links, active icons, follow button, progress indicators
        primary: {
          main: "#E05454",
        },
        // Chip backgrounds, secondary buttons, tag/badge surfaces
        secondary: {
          main: "#EFF3F4",
          contrastText: "#0F1419",
        },
        background: {
          default: "#F0F2F5", // Page/app background
          paper: "#FFFFFF", // Cards, sidebars, modals, dropdowns
        },
        text: {
          primary: "#0F1419", // Headings, usernames, post body text
          secondary: "#536471", // Timestamps, metadata, placeholder labels
          disabled: "#8B98A5", // Disabled inputs, inactive menu items
        },
        // Horizontal rules, input borders, list separators
        divider: "#EFF3F4",
        // Form validation errors, destructive action alerts
        error: {
          main: "#F4212E",
        },
        // Success toasts, verified badge backgrounds, positive stats
        success: {
          main: "#00BA7C",
        },
      },
    },
    dark: {
      palette: {
        // Buttons, links, active icons, follow button, progress indicators
        primary: {
          main: "#E05454",
        },
        // Chip backgrounds, secondary buttons, tag/badge surfaces
        secondary: {
          main: "#202327",
          contrastText: "#E7E9EA",
        },
        background: {
          default: "#000000", // Page/app background
          paper: "#16181C", // Cards, sidebars, modals, dropdowns
        },
        text: {
          primary: "#E7E9EA", // Headings, usernames, post body text
          secondary: "#71767B", // Timestamps, metadata, placeholder labels
          disabled: "#3E4144", // Disabled inputs, inactive menu items
        },
        // Horizontal rules, input borders, list separators
        divider: "#2F3336",
        // Form validation errors, destructive action alerts
        error: {
          main: "#F4212E",
        },
        // Success toasts, verified badge backgrounds, positive stats
        success: {
          main: "#00BA7C",
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
