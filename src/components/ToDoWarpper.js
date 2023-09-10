import React, { useEffect, useState } from "react";
import "../App.css";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";
import EditToDoForm from "./EditToDoForm";

const ToDoWarpper = () => {
  let [idCounter, setIdCounter] = useState(0); // id method
  let [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  let [doneTodo, setDonetodo] = useState(
    JSON.parse(localStorage.getItem("doneTasks")) || []
  );
  let [deletedTodo, setdeletedTodo] = useState(
    JSON.parse(localStorage.getItem("deletedTodos")) || []
  );

  useEffect(() => {
    //used to save the current state of todos, doneTodo, and deletedTodo to local storage whenever any of these pieces of state change.
    saveDataInLocalStorge(todos, doneTodo, deletedTodo);
  }, [todos, doneTodo, deletedTodo]);

  const formattedDefultDate = ` ${new Date().toLocaleString("default", {
    month: "short",
  })} ${String(new Date().getDate()).padStart(2, "0")}`;

  const addTodo = (text, date) => {
    const newDate = new Date(date);
    const formattedDate = `${newDate.toLocaleString("default", {
      month: "short",
    })} ${String(newDate.getDate()).padStart(2, "0")}`;

    setTodos([
      ...todos,
      {
        id: idCounter,
        task: text === "" ? "un Titled" : text,
        dueDate: date === "" ? formattedDefultDate : formattedDate,
        completed: false,
        isEditing: false,
      },
    ]);

    setIdCounter(idCounter + 1);
    saveDataInLocalStorge(todos, doneTodo, deletedTodo);
  };

  const deleteMethod = (id) => {
    let deletedTask = {};
    let filterTasks = todos.filter((todo) => {
      if (todo.id === id) {
        deletedTask = todo;
        deletedTask.completed = true;
      }
      return todo.id !== id;
    });
    setTodos(filterTasks);
    setdeletedTodo([...deletedTodo, deletedTask]);
    saveDataInLocalStorge(todos, doneTodo, deletedTodo);
  };

  const doneMethod = (id) => {
    let doneTask = {};
    let filterTasks = todos.filter((todo) => {
      if (todo.id === id) {
        doneTask = todo;
        doneTask.completed = true;
      }
      return todo.id !== id;
    });
    setTodos(filterTasks);
    setDonetodo([...doneTodo, doneTask]);
    saveDataInLocalStorge(todos, doneTodo, deletedTodo);
  };
  const reTodo = (id) => {
    let reTodo = {};
    let filterTasks = doneTodo.filter((todo) => {
      if (todo.id === id) {
        reTodo = todo;
        reTodo.completed = false;
      }
      return todo.id !== id;
    });
    setDonetodo(filterTasks);
    setTodos([...todos, reTodo]);
    saveDataInLocalStorge(todos, doneTodo, deletedTodo);
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  function saveDataInLocalStorge(taskArray, doneArray, deleteArray) {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    localStorage.setItem("doneTasks", JSON.stringify(doneArray));
    localStorage.setItem("deletedTodos", JSON.stringify(deleteArray));
  }

  return (
    <div>
      <div className="TodoWrapperContainer">
        <div className="TodoWrapper">
          <h1>To Do List</h1>
          <ToDoForm addTodo={addTodo} deletedTodo={deletedTodo} />
          {todos.map((todo, index) =>
            todo.isEditing ? (
              <EditToDoForm editTodo={editTodo} task={todo} />
            ) : (
              <ToDo
                key={index}
                task={todo}
                deleteMethod={deleteMethod}
                doneMethod={doneMethod}
                reToDo={reTodo}
                editTask={editTask}
              />
            )
          )}
        </div>

        <div className="TodoWrapper">
          <h1> Done Tasks</h1>
          {doneTodo.map((todo, index) => (
            <ToDo key={index} task={todo} reToDo={reTodo} fun={"done"} />
          ))}
        </div>

        <div className="TodoWrapper">
          <h1> Deleted Tasks</h1>
          {deletedTodo.map((todo, index) => (
            <ToDo key={index} task={todo} fun={"delete"} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoWarpper;
