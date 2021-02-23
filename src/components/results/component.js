import React from "react";
import { useHistory } from "react-router-dom";

function ResultComponent({ setStepNumber }) {
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
    <div className="container mt-5 results-wrapper">
      <div className="card result-card my-4">
        <div className="pipeline-name">
          Pipeline Number #4
        </div>
        <div className="d-flex flex-row">
          <div className="py-2 created-at">
            Created at: 21/02/2021 14:39
          </div>
          <div className="p-2 status">
            Status: Pending
          </div>
        </div>
      </div>
      <div className="card result-card my-4">
        <div className="pipeline-name">
          <div className="float-left">
            Pipeline Number #3
          </div>
          <div className="float-right">
            <button className="btn btn-outline-primary btn-sm">Download as PDF</button>
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="py-2 created-at">
            Created at: 21/02/2021 14:39
          </div>
          <div className="p-2 status">
            Status: Completed
          </div>
        </div>
        <div className="py-2 created-at">
          Result: <b>Undetermined</b>
        </div>
        <div className="row result">
          <div className="col-3 py-2 status">
            Age: 64
          </div>
          <div className="col-3 py-2 status">
            Gender: Male
          </div>
          <div className="col-6 py-2 status">
            Left Hippocampal Volume: 1800mm<sup>3</sup>
          </div>
          <div className="col-6 py-2 status">
            Right Hippocampal Volume: 2700mm<sup>3</sup>
          </div>
        </div>
        <div className="row result pt-3">
          <div className="col-4 py-2 status">
            Accuracy: 30%
          </div>
          <div className="col-4 py-2 status">
            Precision: 60%
          </div>
          <div className="col-4 py-2 status">
            Significant difference (P): 0.4
          </div>
        </div>
      </div>
      <div className="card result-card my-4">
        <div className="pipeline-name">
          <div className="float-left">
            Pipeline Number #2
          </div>
          <div className="float-right">
            <button className="btn btn-outline-primary btn-sm">Download as PDF</button>
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="py-2 created-at">
            Created at: 21/02/2021 14:39
          </div>
          <div className="p-2 status">
            Status: Completed
          </div>
        </div>
        <div className="py-2 created-at">
          Result: <b>Non-demented</b>
        </div>
        <div className="row result">
          <div className="col-3 py-2 status">
            Age: 88
          </div>
          <div className="col-3 py-2 status">
            Gender: Female
          </div>
          <div className="col-6 py-2 status">
            Left Hippocampal Volume: 1800mm<sup>3</sup>
          </div>
          <div className="col-6 py-2 status">
            Right Hippocampal Volume: 2700mm<sup>3</sup>
          </div>
        </div>
        <div className="row result pt-3">
          <div className="col-4 py-2 status">
            Accuracy: 80%
          </div>
          <div className="col-4 py-2 status">
            Precision: 80%
          </div>
          <div className="col-4 py-2 status">
            Significant difference (P): 0.02
          </div>
        </div>
      </div>
      <div className="card result-card my-4">
        <div className="pipeline-name">
          <div className="float-left">
            Pipeline Number #1
          </div>
          <div className="float-right">
            <button className="btn btn-outline-primary btn-sm">Download as PDF</button>
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="py-2 created-at">
            Created at: 10/02/2021 14:39
          </div>
          <div className="p-2 status">
            Status: Completed
          </div>
        </div>
        <div className="py-2 created-at">
          Result: <b>Demented</b>
        </div>
        <div className="row result">
          <div className="col-3 py-2 status">
            Age: 54
          </div>
          <div className="col-3 py-2 status">
            Gender: Male
          </div>
          <div className="col-6 py-2 status">
            Left Hippocampal Volume: 1400mm<sup>3</sup>
          </div>
          <div className="col-6 py-2 status">
            Right Hippocampal Volume: 2000mm<sup>3</sup>
          </div>
        </div>
        <div className="row result pt-3">
          <div className="col-4 py-2 status">
            Accuracy: 89%
          </div>
          <div className="col-4 py-2 status">
            Precision: 93%
          </div>
          <div className="col-4 py-2 status">
            Significant difference (P): 0.01
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultComponent;
