import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
	component: Comp,
	isLoggedIn,
	path,
	redirect,
	...rest
}) => {
	return (
		<Route
			path={path}
			{...rest}
			render={(props) =>
				isLoggedIn ? <Comp {...props} /> : <Redirect to={redirect} />
			}
		/>
	);
};

export default ProtectedRoute;
