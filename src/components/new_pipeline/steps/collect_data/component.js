import React from "react";

function CollectDataComponent({ setStepNumber }) {

  const subHeader = () => (
    <div className="d-flex flex-row justify-content-around sub-header-steps">
      <div className="step active">
      1
      </div>
      <div className="step">
      2
      </div>
      <div className="step">
      3
      </div>
    </div>
  );

  const next = () => {
    setStepNumber(2);
  }

  return (
    <div>
      {subHeader()}
      <div className="container row collect-data-wrapper my-4">
        <div className="col-sm-6 my-4">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" />
        </div>
        <div className="col-sm-6 my-4">
          <label className="form-label">Gender</label>
          <input type="number" className="form-control" />
        </div>
        <div className="col-sm-6 my-4">
          <label className="form-label">Left Hippocampal Volume (in mm3)</label>
          <input type="number" className="form-control" />
        </div>
        <div className="col-sm-6 my-4">
          <label className="form-label">Right Hippocampal Volume (in mm3)</label>
          <input type="number" className="form-control" />
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-outline-primary" onClick={next}>Next</button>
      </div>
    </div>
  )
}

export default CollectDataComponent;
