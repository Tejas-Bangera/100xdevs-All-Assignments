import axios from "axios";

const ToDo = ({ todo, setTodos }) => {
  function deleteToDo(id) {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then((response) => setTodos(response.data));
  }

  return (
    <div className="d-flex align-items-center justify-content-between p-2">
      <div>
        <h5 className="m-0 p-0">{todo.title}</h5>
        <p className="m-0 p-0">{todo.description}</p>
      </div>
      <div>
        <button className="btn btn-danger" onClick={() => deleteToDo(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default ToDo;
