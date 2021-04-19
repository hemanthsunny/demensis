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
    	<div className="pt-5 bg-light-dark" style={{minHeight: "120vh"}}>
  	  	{children}
    	</div>
    </div>
  );
};

export default DefaultLayoutComponent;
