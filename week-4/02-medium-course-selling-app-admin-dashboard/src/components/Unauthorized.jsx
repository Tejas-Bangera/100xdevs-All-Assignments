import { Grid, Typography } from "@mui/material";

const Unauthorized = () => {
  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Grid item>
        <Typography variant="h3">401 Unauthorized</Typography>
      </Grid>
    </Grid>
  );
};
export default Unauthorized;
