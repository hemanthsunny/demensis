import React, { useState, useEffect } from "react";
import moment from "moment";
import { jsPDF } from "jspdf"
import { JSDOM } from "jsdom"

import { getQuery, firestore } from "config/firebase";

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
    console.log('res', record);
    const htmlTemplate = (
      <div className="card result-card my-4">
        <div className="pipeline-name">
          <div className="float-left">
            Pipeline Number #3
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
    )
    const domHtml = new JSDOM(htmlTemplate, { contentType: "text/html" });
    // global.window = domHtml.window;
    // global.document = window.document;
    // global.Node = window.Node;
    const doc = new jsPDF("p", "pt", "a4");
    await doc.html(
      domHtml, {
      callback: (pdf) => {
        pdf.save(`demensis_report_${record.createdAt}.pdf`)
      }
    })
    // doc.save(`demensis_report_${record.createdAt}.pdf`)
  }

  return (
    <div className="result-wrapper">
      <table className="table">
        <thead>
          <tr>
            <td>Status</td>
            <td>Job Id</td>
            <td>Pipeline</td>
            <td>Created at</td>
            <td>Result</td>
            <td>Accuracy</td>
            <td>Precision</td>
            <td>Significant difference</td>
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
              <td>SVM</td>
              <td>{moment(res.createdAt).format("YYYY/MM/DD HH:mm:ss")}</td>
              <td className="text-capitalize">{res.result}</td>
              <td>{Math.round(res.accuracy)}%</td>
              <td>{res.precision}</td>
              <td>{res.significant_difference}</td>
              <td>
                <button className="btn btn-outline-primary btn-sm" onClick={e => downloadPdf(res)}>
                  <i className="fa fa-download"></i>
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
