import React from "react";
import { useSelector } from "react-redux";

import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from "react-router-dom";
import Header from "./components/header/index";
import Dashboard from "./components/dashboard";
import Appointments from "./components/appointments";
import Specialities from "./components/specialities";
import Doctors from "./components/doctors";
import Patients from "./components/patients";
import Reviews from "./components/reviews";
import Transaction from "./components/transaction";
import Settings from "./components/settings";
import InvoiceReport from "./components/invoicereport";
import Invoice from "./components/invoicereport/invoice";
import Profile from "./components/profile";
import Login from "./components/login";
import Register from "./components/register";
import ForgotPassword from "./components/forgotpassword";
import Lockscreen from "./components/lockscreen";
import Error from "./components/error404";
import ErrorPage from "./components/error500";
import Chat from "./components/chat";
import Prescriptions from "./components/prescriptions";
import Billings from "./components/billings";
import Call from "./components/call";
import PatientProfile from "./components/patientprofile";

import ProtectedRoute from '../ProtectedRoute'

const AppUniversal = function (props) {
	const user = useSelector((state) => state.auth.user);

	return (
		<Router>
			<div className="main-wrapper">
				<Route render={(props) => <Header {...props} />} />
				<Switch>
					<Route
						path="/admin/lockscreen"
						exact
						component={Lockscreen}
					/>
					<ProtectedRoute
						path="/admin/login"
						isLoggedIn={!(user && user.role === "admin")}
						component={Login}
						redirect={"/admin"}
						exact
					/>
					<ProtectedRoute
						path="/admin/register"
						isLoggedIn={!(user && user.role === "admin")}
						component={Register}
						redirect={"/admin"}
						exact
					/>
					<ProtectedRoute
						path="/admin/forgot-password"
						isLoggedIn={!(user && user.role === "admin")}
						component={ForgotPassword}
						redirect={"/admin"}
						exact
					/>
					<ProtectedRoute
						path="/admin"
						isLoggedIn={user && user.role === "admin"}
						component={Dashboard}
						redirect={"/admin/login"}
						exact
					/>
					<ProtectedRoute
						path="/admin/appointments"
						isLoggedIn={user && user.role === "admin"}
						component={Appointments}
						redirect={"/admin/login"}
						exact
					/>
					<ProtectedRoute
						path="/admin/patients"
						isLoggedIn={user && user.role === "admin"}
						component={Patients}
						redirect={"/admin/login"}
						exact
					/>
					<ProtectedRoute
						path="/admin/profile"
						isLoggedIn={user && user.role === "admin"}
						component={Profile}
						redirect={"/admin/login"}
						exact
					/>
					<ProtectedRoute
						path="/admin/chat"
						isLoggedIn={user && user.role === "admin"}
						component={Chat}
						redirect={"/admin/login"}
						exact
					/>
					<ProtectedRoute
						path="/admin/precriptions"
						isLoggedIn={user && user.role === "admin"}
						component={Prescriptions}
						redirect={"/admin/login"}
						exact
					/>
					<ProtectedRoute
						path="/admin/call"
						isLoggedIn={user && user.role === "admin"}
						component={Call}
						redirect={"/admin/login"}
						exact
					/>
					<Route path="/admin/404" exact component={Error} />
					<Route path="/admin/500" exact component={ErrorPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default AppUniversal;
