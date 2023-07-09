import { useState } from "react";
import Form from "./Form";
import Alert from "./Alert";

const CreateToDo = ({ todos, setTodos }) => {
  let [alert, setAlert] = useState(false);

  return (
    <div className="d-flex flex-column border bg-white p-3 rounded mt-4 mb-4 w-50 shadow">
      {alert && <Alert setAlert={setAlert} />}
      <Form setAlert={setAlert} todos={todos} setTodos={setTodos} />
    </div>
  );
};
export default CreateToDo;
