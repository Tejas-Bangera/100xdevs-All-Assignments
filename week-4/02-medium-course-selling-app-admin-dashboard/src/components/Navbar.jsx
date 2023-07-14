import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import validateJWT from "../validateJWT";
import Loading from "./Loading";
import GlobalContext from "../context/GlobalContext";

const Navbar = () => {
  // const navigate = useNavigate();
  // let [loggedIn, setLoggedIn] = useState(false);
  // let [isLoading, setIsLoading] = useState(true);
  // let [username, setUsername] = useState("Hello!");
  let { loggedIn, setLoggedIn, username, setUsername } =
    useContext(GlobalContext);

  const memoValidateJWT = useCallback(validateJWT, []);

  useEffect(() => {
    // setIsLoading(true);
    async function callValidateJWT() {
      return await memoValidateJWT();
    }

    callValidateJWT()
      .then((response) => {
        setLoggedIn(true);
        setUsername(response.data.username);
        // setTimeout(() => setIsLoading(false), 500);
      })
      .catch((error) => {
        console.log(error);
        setLoggedIn(false);
        // setIsLoading(false);
      });
  }, []);

  return (
    <AppBar position="relative">
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item display="flex" alignItems="center">
            <SchoolIcon sx={{ mr: 2 }} />
            <a href="/">
              <Typography
                variant="h6"
                color="inherit"
                fontWeight="600"
                flexGrow={1}
              >
                BackRow
              </Typography>
            </a>
          </Grid>
          {/* {isLoading ? (
            <CircularProgress size={25} color="secondary" />
          ) : ( */}
          <Grid item display="flex" alignItems="center" columnGap={2}>
            <Typography variant="overline">{username}</Typography>

            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                localStorage.removeItem("token");
                // navigate("/");
                window.location.href = `${loggedIn ? "/" : "/login"}`;
              }}
              sx={{
                m: 0,
                ":hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              {loggedIn ? "Logout" : "Login"}
            </Button>
            {!loggedIn && (
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => {
                  window.location.href = "/register";
                }}
                sx={{
                  m: 0,
                  ":hover": {
                    backgroundColor: "#333",
                  },
                }}
              >
                Register
              </Button>
            )}
          </Grid>
          {/* )} */}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
