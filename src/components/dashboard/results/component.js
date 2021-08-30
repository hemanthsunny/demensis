import React, { useState, useEffect } from "react";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { getQuery, firestore } from "config/firebase";

const exportPdfRows = [
  {
    key: 'id',
    title: 'Job id',
    value: (v) => v.substring(0, 6)
  },
  {
    key: 'age',
    title: 'Age',
    value: (v) => v
  },
  {
    key: 'gender',
    title: 'Gender',
    value: (v) => v
  },
  {
    key: 'mean_lhv',
    title: 'Left Hippocampal Volume',
    value: (v) => v + ' cubic millimeter'
  },
  {
    key: 'mean_rhv',
    title: 'Right Hippocampal Volume',
    value: (v) => v + ' cubic millimeter'
  },
  {
    key: 'pipeline',
    title: 'Pipeline',
    value: (v) => v.replace(/_/g, ' ').toUpperCase() || 'SVM'
  },
  {
    key: 'result',
    title: 'Result',
    value: (v) => {
      v = v[0].toUpperCase() + v.slice(1, v.length)
      return v
    }
  },
  {
    key: 'accuracy',
    title: 'Accuracy',
    value: (v) => v +'%'
  },
  {
    key: 'status',
    title: 'Status',
    value: (v) => v
  },
  {
    key: 'createdAt',
    title: 'Created at',
    value: (v) => moment(v).format("YYYY/MM/DD HH:mm:ss")
  }
]

function ChildComponent({ currentUser }) {
  const [ results, setResults ] = useState([]);

  useEffect(() => {
    async function getResults() {
      let res = await getQuery(
        firestore.collection('results').orderBy("createdAt", "desc").where('userId', '==', currentUser.id).get()
      );
      if (res[0]) {
        res = res.sort((a, b) => b.createdAt - a.createdAt);
      }
      setResults(res);
    }

    if (!results[0]) {
      getResults();
    }
  }, [])

  const downloadPdf = async (record) => {
    // window.print()
    const doc = new jsPDF();
    const tableRows = [];

    // Reference: https://www.freecodecamp.org/news/how-to-create-pdf-reports-in-react/
    exportPdfRows.map((row, idx) => {
      tableRows.push(
        [
          row.title,
          row.value(record[row.key])
        ]
      )
    });
    doc.autoTable(["Key", "Value"], tableRows)
    // doc.text("Demented patient details", 14, 15)
    doc.save(`demensis_report_${record.createdAt}.pdf`)
  }

  return (
    <div className="result-wrapper">
      <table className="table table-responsive text-center">
        <thead>
          <tr>
            <td>Status</td>
            <td>Job Id</td>
            <td>Pipeline</td>
            <td>Created at</td>
            <td>Result</td>
            <td>Accuracy</td>
            <td>Download</td>
            <td>Age</td>
            <td>Gender</td>
            <td>Left Hippocampal Volume (mm<sup>3</sup>)</td>
            <td>Right Hippocampal Volume (mm<sup>3</sup>)</td>
          </tr>
        </thead>
        <tbody>
        {
          results[0] ? results.map(res => (
            <tr key={res.id}>
              <td className="text-center">{res.status === "pending" ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-check-circle text-success"></i> }</td>
              <td>{res.id.substring(0, 6)}</td>
              <td>{res.pipeline ? res.pipeline.replace(/_/g, ' ').toUpperCase() : 'SVM'}</td>
              <td>{moment(res.createdAt).format("YYYY/MM/DD HH:mm:ss")}</td>
              <td className="text-capitalize">{res.result}</td>
              <td>{Math.round(res.accuracy)}%</td>
              <td>
                <button className="btn btn-outline-primary btn-sm" onClick={e => downloadPdf(res)}>
                  <i className="fa fa-download"></i> Download
                </button>
              </td>
              <td>{res.age}</td>
              <td>{res.gender}</td>
              <td>{res.mean_lhv}</td>
              <td>{res.mean_rhv}</td>
            </tr>
          ))
          :
          <tr>
            <td colSpan="13" className="font-size">No results found. Start a new pipeline.</td>
          </tr>
        }
        </tbody>
      </table>
      <div className="d-none">
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
    </div>
  )
}

export default ChildComponent;
