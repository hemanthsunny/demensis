import React, { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";

import Routes from "./routes/Routes.js";
import { initFirebaseUser } from "./config/firebase";

function App() {
  useEffect(() => {
    async function initUser() {
      await initFirebaseUser();
    }
    initUser();
  }, []);

  return (
    <div>
      <Router>
        <Routes />
      </Router>
    </div>
  )
}

export default App;
