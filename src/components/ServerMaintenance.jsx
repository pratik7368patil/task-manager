import React from "react";
import ServerCard from "./ServerCard";
import "./../style/serverMaintenance.css";
import {
  handleAddServer,
  handleRemoveServer,
} from "./../utilities/utilities.js";

export default function ServerMaintenance(props) {
  const { currentServerList, updateServerList } = props;

  const updateNewServer = () => {
    handleAddServer();
    updateServerList();
  };

  return (
    <div className="server-maintenance-container">
      <h3>This is Server maintenance</h3>
      <button onClick={updateNewServer}>Add Server</button>
      {currentServerList.map((server) => (
        <ServerCard
          key={server.id}
          server={server}
          handleRemoveServer={handleRemoveServer}
          updateServerList={updateServerList}
        />
      ))}
    </div>
  );
}
