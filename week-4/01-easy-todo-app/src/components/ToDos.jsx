import ToDo from "./ToDo";

const ToDos = ({ todos, setTodos }) => {
  return (
    <div className="d-flex flex-column border bg-white p-3 rounded mt-3 w-50 shadow">
      <h3>ToDos</h3>
      {todos.map((todo) => (
        <ToDo key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </div>
  );
};
export default ToDos;
