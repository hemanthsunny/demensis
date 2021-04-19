import React from "react";
import { useHistory } from "react-router-dom";

import { StaticHeaderComponent } from "components";
import { googleSignin } from "../../../config/firebase";

function LoginComponent() {
  const history = useHistory();

  const login = async () => {
    await googleSignin();
    history.push("/app/dashboard");
  }

  return (
    <div>
      <StaticHeaderComponent />
      <div className="login-page-wrapper">
        <button className="btn btn-outline-primary" onClick={login}>Login with Google</button>
      </div>
    </div>
  )
}

export default LoginComponent;
