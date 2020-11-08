import React from "react";
import "./../style/snackbar.css";

export default function Snackbar(props) {
  const { show, message } = props;

  return (
    <div className={show ? "show" : ""} id="snackbar">
      {message}
    </div>
  );
}
