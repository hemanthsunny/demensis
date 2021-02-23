import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import {
  LoginComponent,
  LogoutComponent
} from "../components";

const LandingComponent = () => {
	let token = window.sessionStorage.getItem('token');
	if (!token) {
		return (<Redirect to="/login" />)
	}
	return (<Redirect to="/logout" />);
};

export const Routes = (props) => (
	<Switch>
		<Route exact path="/" component={LandingComponent} />
		<Route path="/login" component={LoginComponent} />
		<Route path="/logout" component={LogoutComponent} />
		<Redirect to="/" />
	</Switch>
);

export default Routes;
