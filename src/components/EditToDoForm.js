import React, { useState } from "react";

const EditToDoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);
  const handleSubmit = (e) => {
    //prevent page upload when from but submit
    e.preventDefault();
    editTodo(value, task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="UpdateTask"
      />
      <button className="todo-btn" type="submit">
        Update
      </button>
    </form>
  );
};

export default EditToDoForm;
