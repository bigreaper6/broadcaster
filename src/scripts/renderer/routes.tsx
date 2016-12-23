import * as React from "react";
import {Router, Route, hashHistory} from "react-router";
import Main from "./components/Main";
import Settings from "./components/settings/Settings";

const routes = (
	<Route path="/" component={Main}>
		<Route path="settings" component={Settings} />
	</Route>
);

export default (
	<Router history={hashHistory} children={routes} />
);
