import React from "react";
import "./../style/serverCard.css";
import { DEFAULT_SERVER_CODE } from "./../utilities/utilities.js";

export default function ServerCard(props) {
  const { handleRemoveServer, server, updateServerList } = props;
  const removeCurrentServer = (serverId) => {
    handleRemoveServer(serverId);
    updateServerList();
  };

  return (
    <div className="server-card">
      <div className="pb-2">
        <span className="primary-head">Running Task: </span>
        <span className="secondary-color secondary-head">
          {server.currentRunningTask === null
            ? "Idle"
            : server.currentRunningTask}
        </span>
      </div>
      {server.id === DEFAULT_SERVER_CODE ? (
        <div className="pb-2">
          <span className="primary-head">Server Name: </span>
          <span className="secondary-color">Default Server</span>
        </div>
      ) : (
        <div className="pb-2">
          <span className="primary-head">Server Id: </span>
          <span className="secondary-color">{server.id}</span>
        </div>
      )}
      {server.id === DEFAULT_SERVER_CODE ||
      server.currentRunningTask !== null ? null : (
        <button
          className="btn btn-secondary"
          onClick={() => removeCurrentServer(server.id)}
        >
          Remove Server
        </button>
      )}
    </div>
  );
}
