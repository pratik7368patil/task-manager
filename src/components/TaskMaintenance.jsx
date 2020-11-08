import React from "react";
import Task from "./Task";
import "./../style/taskMaintenance.css";
import {
  handleAddNTasks,
  handleRemoveTask,
  handleForceRemoveTask,
  freeServer,
} from "./../utilities/utilities.js";

export default function TaskMaintenance(props) {
  const {
    updateCurrentWorkingQueue,
    updateQueueAndServer,
    currentWorkingQueue,
    triggerError,
  } = props;
  const [numberOfTasks, setNumberOfTasks] = React.useState(0);

  const handleSetNTasks = () => {
    if (numberOfTasks <= 0 || numberOfTasks === null) {
      // update this thing to show error --> use snackbar
      triggerError("Invalid Number of Tasks");
      return;
    }
    handleAddNTasks(numberOfTasks);
    updateCurrentWorkingQueue();
  };

  return (
    <div className="task-maintenance-container">
      <div className="task-maintenance-head">
        <h2>Task maintenance</h2>
        <div>
          <input
            className="input-field"
            type="number"
            onChange={(event) => setNumberOfTasks(+event.target.value)}
          />
          <button className="btn btn-secondary" onClick={handleSetNTasks}>
            Add Task
          </button>
        </div>
      </div>
      <div className="task-list-container-handle-scroll">
        <div className="task-list-container">
          {currentWorkingQueue.length > 0 ? (
            currentWorkingQueue.map((task) => (
              <Task
                key={task.id}
                taskId={task.id}
                freeServer={freeServer}
                updateQueueAndServer={updateQueueAndServer}
                handleForceRemoveTask={handleForceRemoveTask}
                handleRemoveTask={handleRemoveTask}
                updateCurrentWorkingQueue={updateCurrentWorkingQueue}
                runningTime={20}
                run={task.isRunning}
              />
            ))
          ) : (
            <div className="empty-task-alert">No Tasks</div>
          )}
        </div>
      </div>
    </div>
  );
}
