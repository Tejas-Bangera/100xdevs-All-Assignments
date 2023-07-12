import { useState } from "react";
import SignIn from "./SignIn";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Email: " + email);
    console.log("Password: " + password);
    console.log("Registeration successful!");
    window.location.href = "/courses";
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
