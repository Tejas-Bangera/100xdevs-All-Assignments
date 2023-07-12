import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { amber } from "@mui/material/colors";

const Navbar = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <SchoolIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" fontWeight="600" flexGrow={1}>
          BackRow
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          href="/"
          sx={{
            m: 0,
            ":hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
