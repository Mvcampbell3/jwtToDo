import React from 'react';
import "./subtask.css"

const SubTask = (props) => {
  return (
    <div className="taskInput">
      <input onChange={e => props.handleInput(e)} name="name" value={props.name} placeholder="Enter Task..." />
      <i className="fas fa-plus" onClick={e => props.submitTask(e)}></i>
    </div>
  );
}

export default SubTask;
