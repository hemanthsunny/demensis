import React from "react";
import { useHistory } from "react-router-dom";

import { StaticHeaderComponent } from "components";
import { signout } from "config/firebase";

function LoginComponent() {
  const history = useHistory();

  const logout = async () => {
    await signout();
    history.push("/");
  }

  return (
    <div>
      <StaticHeaderComponent />
      <div className="login-page-wrapper">
        Something went wrong :(
        <button className="btn btn-outline-primary" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default LoginComponent;
