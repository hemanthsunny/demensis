import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { add, update, timestamp } from 'config/firebase';

function CollectDataComponent({ setStepNumber, currentUser }) {
  const [sample, setSample] = useState({gender: 'Male'})
  const [saveBtn, setSaveBtn] = useState('Next')
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
    setStepNumber(2)
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
    .then(async (data) => {
      let result = await add('results', {
        userId: currentUser.id,
        age: sample['age'],
        gender: sample['gender'] === 'F' ? 'Female' : 'Male',
        mean_lhv: sample['mean_lhv'],
        mean_rhv: sample['mean_rhv'],
        mean_lhv_unit: 'mm<sup>3</sup>',
        mean_rhv_unit: 'mm<sup>3</sup>',
        fileUrl: null,
        status: 'Pending',
        result: data > 0.6 ? 'demented' : (data > 0.4 ? 'undetermined' : 'non-demented'),
        accuracy: data > 0.6 ? (data*100) : (data > 0.4 ? (data*100) : (100 - data*100)),
        precision: 0,
        significant_difference: 0,
        timestamp
      })
      setSaveBtn('Next')
      await update('results', result['id'], {status: 'completed'})
      history.push('/app/dashboard')
    })
  }

  return (
    <div className="py-5">
      {subHeader()}
      <div className="page-header pt-5">
        <h4 className="page-title">Basic Information</h4>
        <hr className="page-divider"/>
      </div>
      <div className="collect-data-wrapper my-4">
        <div className=" my-4">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" onChange={e => setSample({...sample, age: e.target.value})} placeholder="Ex. 45, 55..."/>
        </div>
        <div className="my-4">
          <label className="form-label">Gender</label>
          <select className="form-control" onChange={e => setSample({...sample, gender: e.target.value})}>
            <option value="M" defaultValue>Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div className="my-4">
          <label className="form-label">Left Hippocampal Volume (in mm3)</label>
          <input type="number" className="form-control" onChange={e => setSample({...sample, mean_lhv: e.target.value})} placeholder="Ex. 2200, 2800..."/>
        </div>
        <div className="my-4">
          <label className="form-label">Right Hippocampal Volume (in mm3)</label>
          <input type="number" className="form-control" onChange={e => setSample({...sample, mean_rhv: e.target.value})} placeholder="Ex. 2500, 3000..."/>
        </div>
        <div className="my-4">
          <label className="form-label">Select a pipeline/classifier</label>
          <select className="form-control" onChange={e => setSample({...sample, pipeline: e.target.value})}>
            <option value="svm" defaultValue>Support Vector Machine</option>
            <option value="random_forest">Random Forest</option>
          </select>
        </div>
        <div className="d-none">
          <div className="text-center">
            <b>If you're unsure about the LHV and RHV values. Simply upload the MRI scan and the rest will be taken care of by us.</b>
          </div>
          <br/>
          <div className="col-sm-6 my-4">
            <label className="form-label">Upload MRI T1-w scan</label>
            <input type="file" className="form-control" />
          </div>
        </div>
        <div className="text-center pb-4 pt-2">
          <button className="btn btn-outline-primary" onClick={next}>
            <i className={`fa fa-spinner fa-spin ${saveBtn === 'Next' && 'd-none'}`}></i>&nbsp;{saveBtn}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CollectDataComponent;
