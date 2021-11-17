import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "common";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";

import loginBanner from "../../assets/images/login-banner.png";

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const LoginContainer = (props) => {
	const { api } = useContext(FirebaseContext);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const error = useSelector((state) => state.auth.error);
	const loading = useSelector((state) => state.auth.loading);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const query = useQuery();

	useEffect(() => {
		document.body.classList.add("account-page");
		return () => {
			document.body.classList.remove("account-page");
		};
	}, []);

	const login = () => {
		dispatch(api.signIn(email, password));
	};

	if (user && user.role !== "admin") {
		if (query.get("next")) {
			return <Redirect to={query.get("next")} />;
		}
		return <Redirect to="/patient/dashboard" />;
	}

	return (
		<div className="content">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-8 offset-md-2">
						<div className="account-content">
							<div className="row align-items-center justify-content-center">
								<div className="col-md-7 col-lg-6 login-left">
									<img
										src={loginBanner}
										className="img-fluid"
										alt="AlloDocteur226 Connexion"
									/>
								</div>
								<div className="col-md-12 col-lg-6 login-right">
									<div className="login-header">
										<h3>
											Connexion{" "}
											<span>AlloDocteur226</span>
										</h3>
									</div>
									{error && (
										<div className="alert alert-danger">
											{error.message}
										</div>
									)}
									{user && user.role === "admin" && (
										<div className="alert alert-danger">
											Veuillez vous connectez avec un
											compte patient
										</div>
									)}
									<div className="form-group form-focus">
										<input
											type="email"
											className="form-control floating"
											onChange={(event) =>
												setEmail(event.target.value)
											}
										/>
										<label className="focus-label">
											Email
										</label>
									</div>
									<div className="form-group form-focus">
										<input
											type="password"
											className="form-control floating"
											onChange={(event) =>
												setPassword(event.target.value)
											}
										/>
										<label className="focus-label">
											Mot de passe
										</label>
									</div>
									<div className="text-right">
										<Link
											to="/forgot-password"
											className="forgot-link"
										>
											Mot de passe oublié ?
										</Link>
									</div>
									{loading ? (
										<button
											className="btn btn-primary btn-block btn-lg login-btn"
											type="button"
											disabled
										>
											<span
												className="spinner-grow spinner-grow-sm"
												role="status"
												aria-hidden="true"
											></span>
											Chargement...
										</button>
									) : (
										<button
											className="btn btn-primary btn-block btn-lg login-btn"
											onClick={login}
										>
											Connexion
										</button>
									)}
									<div className="text-center dont-have">
										Pas de compte?
										<Link
											to={`/register${
												query.get("next")
													? `?next=${query.get(
															"next"
													  )}`
													: ""
											}`}
										>
											Inscription
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginContainer;
