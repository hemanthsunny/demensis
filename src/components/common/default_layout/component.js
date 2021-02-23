import React from "react";
import { useHistory } from "react-router-dom";

import HeaderComponent from "./header";
import { signout } from "config/firebase";

const DefaultLayoutComponent = ({children}) => {
  const history = useHistory();

  const logout = async () => {
    await signout();
    history.push("/");
  }

  return (
    <div>
      <HeaderComponent logout={logout} />
    	<div className="mb-5">
  	  	{children}
    	</div>
    </div>
  );
};

export default DefaultLayoutComponent;
