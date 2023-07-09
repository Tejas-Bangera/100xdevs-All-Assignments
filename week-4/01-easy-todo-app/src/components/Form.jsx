import axios from "axios";
import { useState } from "react";

const Form = ({ setAlert, todos, setTodos }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/todos", { title, description })
      .then((response) => {
        console.log(response.data);
        const newTodos = response.data;
        setTodos(newTodos);
      });
    setAlert(true);
    setTitle("");
    setDescription("");
  };

  return (
    <form className="d-flex flex-column" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="title">
        Title
      </label>
      <input
        id="title"
        value={title}
        className="form-control mb-3"
        type="text"
        required
        onChange={(event) => setTitle(event.target.value)}
      />
      <label className="form-label" htmlFor="description">
        Description
      </label>
      <input
        id="description"
        value={description}
        className="form-control mb-3"
        type="text"
        onChange={(event) => setDescription(event.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Create
      </button>
    </form>
  );
};
export default Form;
