import React from "react";
import { useHistory } from "react-router-dom";

function SubmitComponent({ setStepNumber }) {
  const history = useHistory();

  const subHeader = () => (
    <div className="d-flex flex-row justify-content-around sub-header-steps">
      <div className="step active">
      1
      </div>
      <div className="step active">
      2
      </div>
      <div className="step active">
      3
      </div>
    </div>
  );

  const cancel = () => {
    setStepNumber(1);
  }

  const startPipeline = () => {
    history.push("/app/results");
  }

  return (
    <div>
      {subHeader()}
      <div className="container row collect-data-wrapper my-4">
        <div className="col-sm-6 my-4">
          <label className="form-label">Age</label>
          <input type="text" className="form-control" placeholder="Age" />
        </div>
        <div className="col-sm-6 my-4">
          <label className="form-label">Gender</label>
          <input type="text" className="form-control" placeholder="Gender" />
        </div>
        <div className="col-sm-6 my-4">
          <label className="form-label">Left Hippocampal Volume (in mm3)</label>
          <input type="text" className="form-control" placeholder="Left HV" />
        </div>
        <div className="col-sm-6 my-4">
          <label className="form-label">Right Hippocampal Volume (in mm3)</label>
          <input type="text" className="form-control" placeholder="Right HV" />
        </div>
        <div className="col-sm-6 my-4">
          <label className="form-label">Segmentation type</label>
          <input type="text" className="form-control" placeholder="Segmentation type" />
        </div>
        <div className="col-sm-6 my-4">
          <label className="form-label">Uploaded file</label>
          <input type="file" className="form-control" />
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-outline-primary" onClick={cancel}>Cancel</button>
        <button className="btn btn-outline-primary mx-2" onClick={startPipeline}>Start Pipeline</button>
      </div>
    </div>
  )
}

export default SubmitComponent;
