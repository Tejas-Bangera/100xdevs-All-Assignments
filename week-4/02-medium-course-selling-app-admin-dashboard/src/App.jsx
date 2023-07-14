import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./components/Landing";
import CreateCourse from "./components/CreateCourse";
import Register from "./components/Register";
import Courses from "./components/Courses";
import ProtectedRoutes from "./components/ProtectedRoutes";
import GlobalContext from "./context/GlobalContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
  let [loggedIn, setLoggedIn] = useState("false");
  let [username, setUsername] = useState("Hello!");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalContext.Provider
        value={{ loggedIn, setLoggedIn, username, setUsername }}
      >
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/courses" element={<Courses />} />
              <Route path="/about" element={<CreateCourse />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}

export default App;
