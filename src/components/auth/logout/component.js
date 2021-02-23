import React from "react";
import { useHistory } from "react-router-dom";

import HeaderComponent from "./header";
import { signout } from "../../../config/firebase";

function LogoutComponent() {
  const history = useHistory();

  const logout = async () => {
    await signout();
    history.push("/");
  }

  return (
    <div>
      <HeaderComponent />
      <div className="login-page-wrapper">
        <button className="btn btn-outline-primary" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default LogoutComponent;
