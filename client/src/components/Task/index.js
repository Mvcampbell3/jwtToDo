import React from 'react';
import "./task.css";

const Task = (props) => {
  return (
    <div>
      <h3>{props.name}</h3>
      <button data-task_id={props.taskID} onClick={e => props.changeComplete(e)}>{props.isComplete ? "Undo":"Complete"}</button>
      <button data-task_id={props.taskID} onClick={e => props.deleteTask(e)}>Delete</button>
    </div>
  );
}

export default Task;