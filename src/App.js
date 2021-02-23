import React, { useState, useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import Routes from "routes/Routes.js";
import { LoadingComponent } from "components";
import { initFirebaseUser } from "./config/firebase";
import { SetAuthUser } from "store/actions";

function App({ currentUser, bindAuthUser }) {
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function initUser() {
      await initFirebaseUser(bindAuthUser);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    initUser();
  }, [bindAuthUser]);

  return (
    loading ? <LoadingComponent /> :
    <Router>
      <Routes />
    </Router>
  )
}

const mapStateToProps = (state) => {
	const { currentUser } = state.authUser;
	return { currentUser };
}

const mapDispatchToProps = (dispatch) => {
	return {
		bindAuthUser: (content) => dispatch(SetAuthUser(content))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
