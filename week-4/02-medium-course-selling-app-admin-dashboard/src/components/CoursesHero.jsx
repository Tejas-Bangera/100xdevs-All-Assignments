import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const CoursesHero = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Courses
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Effortlessly create and manage courses with BackRow's intuitive admin
          dashboard.
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" href="/about">
            Create Course
          </Button>
        </div>
      </Container>
    </Box>
  );
};
export default CoursesHero;
