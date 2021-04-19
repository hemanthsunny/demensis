import React from "react";
import { Link } from "react-router-dom";

function HeaderComponent() {
  return (
    <nav class="navbar navbar-fixed-top bg-primary">
      <div class="container">
        <div class="navbar-header">
          <div class="navbar-brand text-light">Project AD</div>
        </div>

        <ul class="nav navbar-nav navbar-right flex-row">
          <li><Link to="/app/home" className="text-light mx-3">Start new</Link></li>
          <li><Link to="/app/dashboard" className="text-light mx-3">Results</Link></li>
          <li><Link to="/app/dashboard"className="text-light mx-2">Logout</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default HeaderComponent;
