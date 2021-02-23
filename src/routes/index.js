import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
	DefaultLayoutComponent,
	ErrorComponent
} from "components";

const AuthSwitchWrapper = (props) => {
	const {
		path,
		exact = false,
		truthyComponent: TruthyComponent,
		falsyComponent: FalsyComponent,
    currentUser,
		...rest
	} = props;

	if (!navigator.onLine) {
		return (<Redirect to="/" />)
	}
	return (
		<Route
			key={path}
			path={path}
			exact={exact}
			render={props => (
					currentUser.email ? (
						<DefaultLayoutComponent>
							<TruthyComponent currentUser={currentUser} {...rest} />
						</DefaultLayoutComponent>
					) : (
						<FalsyComponent />
					)
				)
			}
		/>
	);
};

const mapStateToProps = (state) => {
	const { currentUser } = state.authUser;
	return { currentUser };
}

const AuthSwitch = connect(
	mapStateToProps,
	null
)(AuthSwitchWrapper);

const AuthRoute = ({ component, ...rest }) => (
	<AuthSwitch {...rest} truthyComponent={component} falsyComponent={ErrorComponent} />
);

export default AuthRoute;
