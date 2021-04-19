import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthRoute from "./index";

import {
  LoginComponent,
  LogoutComponent,
  DashboardComponent,
  NewPipelineComponent
} from "components";

const LandingComponent = () => {
	let token = window.sessionStorage.getItem('token');
	if (!token) {
		return (<Redirect to="/login" />)
	}
	return (<Redirect to="/app/dashboard" />);
};

export const Routes = (props) => (
	<Switch>
		<Route exact path="/" component={LandingComponent} />
		<Route path="/login" component={LoginComponent} />
		<AuthRoute path="/logout" component={LogoutComponent} />
    <AuthRoute path="/app/dashboard" component={DashboardComponent} />
    <AuthRoute path="/app/new_pipeline" component={NewPipelineComponent} />
		<Redirect to="/" />
	</Switch>
);

export default Routes;
