import React from "react";
import { Link, useLocation } from "react-router-dom";

function HeaderComponent({ logout }) {
  const loc = useLocation();

  return (
    <nav className="navbar navbar-fixed-top" style={{position: "fixed", zIndex: "99"}}>
      <div className="container">
        <div className="navbar-header">
          <div className="navbar-brand">Demensis</div>
        </div>
        <ul className="nav navbar-nav navbar-right flex-row">
          <li className={`${loc.pathname === '/app/dashboard' && '-active'}`}>
            <Link to="/app/dashboard" className={`option ${loc.pathname === '/app/dashboard' && '-active'}`}><i className="fa fa-tachometer"></i>&nbsp; Dashboard</Link>
          </li>
          <li className={`${loc.pathname === '/app/new_pipeline' && '-active'}`}>
            <Link to="/app/new_pipeline" className={`option mx-2 mx-sm-3 ${loc.pathname === '/app/new_pipeline' && '-active'}`}><i className="fa fa-plus"></i>&nbsp; new job</Link>
          </li>
          <li>
            <div className="btn-link option mx-0 mx-sm-2 -custom" onClick={logout}>
              <i className="fa fa-sign-out"></i>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default HeaderComponent;
