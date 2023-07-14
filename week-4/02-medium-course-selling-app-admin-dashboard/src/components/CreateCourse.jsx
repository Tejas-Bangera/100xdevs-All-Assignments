/// You need to add input boxes to take input for users to create a course.

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

/// I've added one input so you understand the api to do it.
function CreateCourse() {
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    imageLink: "",
    published: true,
  });

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/admin/courses",
        {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          imageLink: formData.imageLink,
          published: formData.published,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSuccessAlert(true);
      })
      .catch((error) => {
        setErrorAlert(true);
        console.log(error);
      });
    event.target.reset();
  }

  return (
    <>
      {/* <Navbar /> */}
      <Container component="main" maxWidth="xs">
        {successAlert && (
          <Alert
            onClose={() => setSuccessAlert(false)}
            severity="success"
            sx={{ mt: 2 }}
          >
            Course created successfully!
          </Alert>
        )}
        {errorAlert && (
          <Alert
            onClose={() => setErrorAlert(false)}
            severity="error"
            sx={{ mt: 2 }}
          >
            Something went wrong!
          </Alert>
        )}
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
              onChange={(event) =>
                setFormData({ ...formData, title: event.target.value })
              }
            />
            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="Description"
              id="description"
              onChange={(event) =>
                setFormData({ ...formData, description: event.target.value })
              }
            />
            <TextField
              margin="normal"
              fullWidth
              name="price"
              label="Price"
              id="price"
              type="number"
              onChange={(event) =>
                setFormData({ ...formData, price: event.target.value })
              }
            />
            <TextField
              margin="normal"
              fullWidth
              name="imageLink"
              label="Image URL"
              id="imageLink"
              onChange={(event) =>
                setFormData({ ...formData, imageLink: event.target.value })
              }
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Published"
              name="published"
              id="published"
              onClick={(event) =>
                setFormData({ ...formData, published: event.target.checked })
              }
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
