import React from "react";

function PipelineComponent({ setStepNumber }) {

  const subHeader = () => (
    <div className="d-flex flex-row justify-content-around sub-header-steps">
      <div className="step active">
      1
      </div>
      <div className="step active">
      2
      </div>
      <div className="step">
      3
      </div>
    </div>
  );

  const next = () => {
    setStepNumber(3);
  }

  return (
    <div>
      {subHeader()}
      <div className="page-header pt-5">
        <h4 className="page-title">Choose a pipeline</h4>
        <hr className="page-divider"/>
      </div>
      <div className="container row collect-data-wrapper my-4">
        <div className="col-sm-6 my-4">
          <label className="form-label">Segmentation</label>
          <input type="text" className="form-control" placeholder="Hippocampus" />
        </div>
        <div className="col-sm-6 my-4">
          <label className="form-label">Upload MRI T1-w scan</label>
          <input type="file" className="form-control" />
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-outline-primary" onClick={next}>Next</button>
      </div>
    </div>
  )
}

export default PipelineComponent;
