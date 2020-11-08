import React from "react";
import ServerCard from "./ServerCard";
import "./../style/serverMaintenance.css";
import {
  handleAddServer,
  handleRemoveServer,
} from "./../utilities/utilities.js";

export default function ServerMaintenance(props) {
  const { currentServerList, updateServerList, triggerError } = props;

  const updateNewServer = () => {
    if (currentServerList.length === 10) {
      triggerError("Server limit full!");
      return;
    }
    handleAddServer();
    updateServerList();
  };

  return (
    <div className="server-maintenance-container">
      <div className="server-maintenance-head">
        <h2>Server maintenance</h2>
        <button className="btn btn-secondary" onClick={updateNewServer}>
          Add Server
        </button>
      </div>
      <div className="server-list-container-handle-scroll">
        <div className="server-list-container">
          {currentServerList.map((server) => (
            <ServerCard
              key={server.id}
              server={server}
              handleRemoveServer={handleRemoveServer}
              updateServerList={updateServerList}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
