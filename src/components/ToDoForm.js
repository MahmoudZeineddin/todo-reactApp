import React, { useState } from "react";

const ToDoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the page onload when form submit
    addTodo(value, date);
    setValue("");
    setDate("");
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Create the date string in the format "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <div>
      <form className="TodoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="enter your task.."
          value={value} //to make the input is empty
          onChange={(e) => setValue(e.target.value)}
        />

        <input
          value={date}
          type="date"
          min={formattedDate}
          className="todo-input"
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit" className="todo-btn">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;

/* e represents the event object. e.target refers 
      to the DOM element (the input field in this case) */
