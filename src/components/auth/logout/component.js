import React from "react";
import { useHistory } from "react-router-dom";

import { signout } from "../../../config/firebase";

function LogoutComponent() {
  const history = useHistory();

  const logout = async () => {
    await signout();
    history.push("/");
  }

  return (
    <div>
      LogoutComponent
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default LogoutComponent;
