import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function ShowCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/courses", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => setCourses(response.data.courses))
      .catch((error) => console.log(error));
  }, []);

  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: "56.25%",
                }}
                image={course.imageLink}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {course.title}
                </Typography>
                <Typography>{course.description}</Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Grid container>
                  <Grid
                    item
                    flexGrow={1}
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="space-between"
                  >
                    <Button size="small" variant="outlined" color="secondary">
                      Edit
                    </Button>
                    <Typography fontSize="15px" fontWeight="bold">
                      Rs.{course.price}
                    </Typography>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ShowCourses;
