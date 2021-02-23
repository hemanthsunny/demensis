import React from "react";
import { Link } from "react-router-dom";

function HeaderComponent({ logout }) {
  return (
    <nav className="navbar bg-primary navbar-fixed-top" style={{position: "fixed", zIndex: "99"}}>
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="navbar-brand text-light">Project AD</div>
        </div>

        <ul className="nav navbar-nav navbar-right flex-row">
          <li><Link to="/app/new_pipeline" className="text-light mx-3">Start new pipeline</Link></li>
          <li><Link to="/app/results" className="text-light mx-3">Results</Link></li>
          <li><div className="btn-link text-light mx-2 pointer" onClick={logout}>Logout</div></li>
        </ul>
      </div>
    </nav>
  )
}

export default HeaderComponent;
