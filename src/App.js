import React from "react";
import "./App.css";
import ServerMaintenance from "./components/ServerMaintenance";
import TaskMaintenance from "./components/TaskMaintenance";
import {
  getCurrentServerList,
  getCurrentTaskList,
  assignServer,
} from "./utilities/utilities.js";

function App() {
  // code to update server list
  const [currentServerList, setCurrentServerList] = React.useState(
    getCurrentServerList()
  );

  const [currentWorkingQueue, setCurrentWorkingQueue] = React.useState([]);

  const updateServerList = () => {
    setCurrentServerList([...getCurrentServerList()]);
  };

  // code to update task queue

  const updateCurrentWorkingQueue = () => {
    const currentUpdatedQueue = [...getCurrentTaskList()];
    console.log(currentUpdatedQueue);
    setCurrentWorkingQueue(currentUpdatedQueue);
  };

  const updateQueueAndServer = () => {
    updateServerList();
    updateCurrentWorkingQueue();
  };

  React.useEffect(() => manageWaitingTask());

  const manageWaitingTask = () => {
    const assignStatusTaskId = assignServer();
    if (assignStatusTaskId !== null) {
      updateQueueAndServer();
    }
  };

  return (
    <div className="main-container">
      <TaskMaintenance
        updateCurrentWorkingQueue={updateCurrentWorkingQueue}
        updateQueueAndServer={updateQueueAndServer}
        currentWorkingQueue={currentWorkingQueue}
      />
      <ServerMaintenance
        currentServerList={currentServerList}
        updateServerList={updateServerList}
      />
    </div>
  );
}

export default App;
