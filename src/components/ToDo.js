import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ToDo = (props) => {
  if (props.task.completed !== true) {
    return (
      <div>
        <div className="Todo">
          <input
            onClick={() => props.doneMethod(props.task.id)}
            type="checkbox"
            checked={false}
            style={{ width: "30px", height: "19px", backgroundColor: "red" }}
          />
          <p>{props.task.dueDate}</p>
          <p className={`${props.task.completed ? "completed" : ""}`}>
            {props.task.task}
          </p>
          <div>
            {/* <FontAwesomeIcon
              icon={faPenToSquare}
              // onClick={() => props.editTask(props.task.id)}
            /> */}
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => props.deleteMethod(props.task.id)}
            />
          </div>
        </div>
      </div>
    );
  } else if (props.fun === "delete") {
    return (
      <div>
        <div className="Todo-done" style={{ justifyContent: "center" }}>
          <p style={{ marginRight: "30px" }}>{props.task.dueDate}</p>
          <p>{props.task.task}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="Todo-done">
          <input
            onClick={() => props.reToDo(props.task.id)}
            type="checkbox"
            checked={true}
            style={{ width: "30px", height: "19px", backgroundColor: "red" }}
          />
          <p>{props.task.dueDate}</p>
          <p>{props.task.task}</p>
        </div>
      </div>
    );
  }
};

export default ToDo;
