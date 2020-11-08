import React from "react";
import "./App.css";
import ServerMaintenance from "./components/ServerMaintenance";
import TaskMaintenance from "./components/TaskMaintenance";
import Snackbar from "./components/Snackbar";
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

  // storing task queue
  const [currentWorkingQueue, setCurrentWorkingQueue] = React.useState([]);

  const updateServerList = () => {
    setCurrentServerList([...getCurrentServerList()]);
  };

  // code to update task queue

  const updateCurrentWorkingQueue = () => {
    setCurrentWorkingQueue([...getCurrentTaskList()]);
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

  // for error handling
  const [show, setShow] = React.useState(false); // for snackbar
  const [message, setMessage] = React.useState("");
  const triggerError = (msg) => {
    setShow(true);
    setMessage(msg);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };
  // error handling ends here

  return (
    <>
      <div className="main-container">
        <TaskMaintenance
          triggerError={triggerError}
          updateCurrentWorkingQueue={updateCurrentWorkingQueue}
          updateQueueAndServer={updateQueueAndServer}
          currentWorkingQueue={currentWorkingQueue}
        />
        <ServerMaintenance
          triggerError={triggerError}
          currentServerList={currentServerList}
          updateServerList={updateServerList}
        />
      </div>
      <Snackbar message={message} show={show} />
    </>
  );
}

export default App;
