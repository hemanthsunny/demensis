import React from "react";
import { useHistory } from "react-router-dom";

import HeaderComponent from "./header";
import { googleSignin } from "../../../config/firebase";

function LoginComponent() {
  const history = useHistory();

  const login = async () => {
    await googleSignin();
    history.push("/app/results");
  }

  return (
    <div>
      <HeaderComponent />
      <div className="login-page-wrapper">
        <button className="btn btn-outline-primary" onClick={login}>Login with Google</button>
      </div>
    </div>
  )
}

export default LoginComponent;
