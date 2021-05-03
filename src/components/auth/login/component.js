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
        <div className="bg-img"></div>
        <div className="bg-text">
          <h1 className="header">
            Finding dementia is now easy, fast and inexpensive with AI.<br/> <br/>
            <span className="sr-only">Keep your brain healthy and record all checkups in one place with the aid of AI</span>
            <span className="sr-only">Generate preliminary reports of your brain within seconds after your MRI scan. </span>
            <span className="sr-only">With the aid of Artificial Intelligence, generate preliminary reports dementia.</span>
          </h1>
          <button className="btn btn-primary" onClick={login}>Login with Google</button>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent;
