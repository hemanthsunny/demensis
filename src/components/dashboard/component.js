import React from "react";
import { useHistory } from "react-router-dom";

import ResultsComponent from "./results/component";

function ParentComponent({ setStepNumber, currentUser }) {
  const history = useHistory();

  return (
    <div className="container mt-5 dashboard-wrapper">
      <div className="page-header">
        <h4 className="page-title">Dashboard</h4>
        <hr className="page-divider"/>
      </div>
      <ResultsComponent currentUser={currentUser} />
    </div>
  )
}

export default ParentComponent;
