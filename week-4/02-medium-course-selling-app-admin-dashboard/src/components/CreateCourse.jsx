/// You need to add input boxes to take input for users to create a course.

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Navbar from "./Navbar";

/// I've added one input so you understand the api to do it.
function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Course created!");
    event.target.reset();
  }

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" textTransform="capitalize">
            Create Course
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="Description"
              id="description"
              onChange={(event) => setDescription(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, textTransform: "uppercase" }}
            >
              Create
            </Button>
            <Button href="/courses" fullWidth color="secondary">
              Back
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default CreateCourse;
