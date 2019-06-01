import React from 'react';
import "./task.css";

const Task = (props) => {
  return (
    <div className="task">
      <h3 className="taskName" style={{ textDecoration: props.isComplete ? "line-through" : "none" }}>{props.name}</h3>
      <div className="taskBtnGroup">
        <i className={props.isComplete ? "fas fa-undo-alt comp" : "fas fa-check-square notComp"}
          data-task_id={props.taskID} onClick={e => props.changeComplete(e)}></i>
        <i className="fas fa-times-circle" data-task_id={props.taskID} onClick={e => props.deleteTask(e)}></i>
      </div>
    </div>
  );
}

export default Task;
