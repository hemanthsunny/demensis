import React from "react";
import { Link } from "react-router-dom";

function HeaderComponent({ logout }) {
  return (
    <nav className="navbar navbar-fixed-top" style={{position: "fixed", zIndex: "99"}}>
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="navbar-brand">Demensis</div>
        </div>

        <ul className="nav navbar-nav navbar-right flex-row">
          <li><Link to="/app/dashboard" className="option mr-2 mr-sm-3">Dashboard</Link></li>
          <li>
            <Link to="/app/new_pipeline" className="option mx-2 mx-sm-3">new pipeline</Link>
          </li>
          <li><div className="btn-link option mx-0 mx-sm-2 -custom" onClick={logout}>Logout</div></li>
        </ul>
      </div>
    </nav>
  )
}

export default HeaderComponent;
