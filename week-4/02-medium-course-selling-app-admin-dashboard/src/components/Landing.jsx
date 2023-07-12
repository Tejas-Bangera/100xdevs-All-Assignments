import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CssBaseline, Grid, ThemeProvider } from "@mui/material";
/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?learning)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            padding: "0 5em",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h2">BackRow</Typography>
          <Typography
            variant="h6"
            color="GrayText"
            sx={{
              padding: "20px 0",
            }}
          >
            Elevate your software development skills with cutting-edge courses.
            Learn at your own pace, connect with a vibrant community, and excel
            in your career. Start today!
          </Typography>
          <div>
            <Button
              type="button"
              variant="contained"
              href="/login"
              sx={{ mr: 3 }}
            >
              Login
            </Button>
            <Button type="button" variant="contained" href="/register">
              Register
            </Button>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Landing;
