import React from "react";
import { Link } from "react-router-dom";

function ParentComponent({ logout }) {
  const handleAlert = (n) => {
    alert(`We're working on ${n}. We'll be releasing it shortly.`)
  }

  return (
    <nav className="navbar navbar-fixed-top" style={{position: "fixed", zIndex: "99"}}>
      <div className="container">
        <div className="navbar-header">
          <div className="navbar-brand">Demensis</div>
        </div>

        <ul className="nav navbar-nav navbar-right flex-row">
          <li><div className="option mx-3" onClick={e => handleAlert("Whitepaper")}>White paper (v1.0)</div></li>
          <li><div className="option mx-3" onClick={e => handleAlert("Documentation")}>DOCUMENTATION</div></li>
        </ul>
      </div>
    </nav>
  )
}

export default ParentComponent;
