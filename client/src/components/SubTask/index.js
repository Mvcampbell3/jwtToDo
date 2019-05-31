import React from 'react';
import "./subtask.css"

const SubTask = (props) => {
  return (
    <div>
      <input onChange={e => props.handleInput(e)} name="name" value={props.name} placeholder="Enter Task..." />
      <button onClick={e => props.submitTask(e)}>Submit</button>
    </div>
  );
}

export default SubTask;