import { useState } from "react";
import SignIn from "./SignIn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/admin/signup", {
        username: email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", "Bearer " + response.data.token);
        navigate("/courses");
      })
      .catch((err) => console.log(err));
  }

  return (
    <SignIn
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      action={"register"}
    />
  );
}

export default Register;
