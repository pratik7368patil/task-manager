import React from "react";
import "./../style/serverCard.css";

export default function ServerCard(props) {
  const { handleRemoveServer, server, updateServerList } = props;
  const removeCurrentServer = (serverId) => {
    handleRemoveServer(serverId);
    updateServerList();
  };

  return (
    <div className="server-card">
      <div>
        Running Task:{" "}
        {server.currentRunningTask === null
          ? "Idle"
          : server.currentRunningTask}
      </div>
      {server.id === 100 ? (
        <div>Server Name: Default Server</div>
      ) : (
        <div>Server ID: {server.id}</div>
      )}
      {server.id === 100 || server.currentRunningTask !== null ? null : (
        <button onClick={() => removeCurrentServer(server.id)}>
          Remove Server
        </button>
      )}
    </div>
  );
}
