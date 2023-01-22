import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

export default function BackButton({ styling }) {
  let history = useHistory();
  function back() {
    history.goBack();
  }
  return (
    <div className={styling}>
      <button className="btn btn-outline-primary" onClick={back}>
        <FontAwesomeIcon icon={["fa", "arrow-left"]} size="1x" />
      </button>
    </div>
  );
}
