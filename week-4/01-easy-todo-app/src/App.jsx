import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CreateToDo from "./components/CreateToDo";
import ToDos from "./components/ToDos";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => setTodos(response.data));
  }, []);

  return (
    <>
      <div className="vh-100 bg-light">
        <Navbar />
        <div className="d-flex flex-column align-items-center">
          <CreateToDo todos={todos} setTodos={setTodos} />
          <ToDos todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </>
  );
}

export default App;
