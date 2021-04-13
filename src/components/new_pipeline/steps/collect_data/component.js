import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CollectDataComponent({ setStepNumber }) {
  const [sample, setSample] = useState({gender: 'M'})
  const [saveBtn, setSaveBtn] = useState('Run Analysis')
  const history = useHistory()

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
    setSaveBtn('Hold on! we are analysing your result')
    // setStepNumber(2);
    fetch('/predict', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sample)
    }).then((res) => res.json())
    .then(data => {
      console.log('---', data);
    })
    setTimeout(() => {
      setSaveBtn('Run Analysis')
      history.push('/app/results')
    }, 5000)
  }

  return (
    <div>
      {subHeader()}
      <div className="container row collect-data-wrapper my-4">
        <div className="col-sm-6 my-4">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" onChange={e => setSample({...sample, age: e.target.value})}/>
        </div>
        <div className="col-sm-6 my-4">
          <label className="form-label">Gender</label>
          <select className="form-control" onChange={e => setSample({...sample, gender: e.target.value})}>
            <option value="M" defaultValue>Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div className="col-sm-6 my-4">
          <label className="form-label">Left Hippocampal Volume (in mm3)</label>
          <input type="number" className="form-control" onChange={e => setSample({...sample, mean_lhv: e.target.value})}/>
        </div>
        <div className="col-sm-6 my-4">
          <label className="form-label">Right Hippocampal Volume (in mm3)</label>
          <input type="number" className="form-control" onChange={e => setSample({...sample, mean_rhv: e.target.value})}/>
        </div>
      </div>
      <br/>
      <div className="text-center">
        <b>If you're unsure about the LHV and RHV values. Simply upload the MRI scan and the rest will be taken care of by us.</b>
      </div>
      <br/>
      <div className="col-sm-6 my-4">
        <label className="form-label">Upload MRI T1-w scan</label>
        <input type="file" className="form-control" />
      </div>
      <div className="text-center py-4">
        <button className="btn btn-outline-primary" onClick={next}>
          <i className={`fa fa-spinner fa-spin ${saveBtn === 'Run Analysis' && 'd-none'}`}></i>&nbsp;{saveBtn}
        </button>
      </div>
    </div>
  )
}

export default CollectDataComponent;
