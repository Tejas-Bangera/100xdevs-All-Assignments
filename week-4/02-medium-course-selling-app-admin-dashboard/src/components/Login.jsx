import { useState } from "react";
import SignIn from "./SignIn";
import axios from "axios";
import { Alert, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/admin/login", null, {
        headers: {
          username: email,
          password,
        },
      })
      .then((response) => {
        localStorage.setItem("token", "Bearer " + response.data.token);
        navigate("/courses");
      })
      .catch((err) => {
        setAlert(true);
        console.log(err);
      });
  }

  return (
    <>
      {alert && (
        <Container maxWidth="xs" sx={{ mt: 2 }}>
          <Alert severity="error" onClose={() => setAlert(false)}>
            Invalid login credentials!
          </Alert>
        </Container>
      )}
      <SignIn
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        action={"login"}
      />
    </>
  );
}

export default Login;
