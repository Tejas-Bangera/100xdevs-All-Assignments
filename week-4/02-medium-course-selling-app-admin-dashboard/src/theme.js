import { createTheme, responsiveFontSizes } from "@mui/material";
import { amber, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: amber[300],
    },
    secondary: {
      main: "#000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          marginTop: 10,
          "&:hover": {
            background: amber[400],
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
