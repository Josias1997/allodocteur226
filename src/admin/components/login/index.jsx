import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from "common";

import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo-white.png";

const Login = () => {
	const { api } = useContext(FirebaseContext);
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const error = useSelector((state) => state.auth.error);
	const loading = useSelector((state) => state.auth.loading);
	const user = useSelector((state) => state.auth.user);

	const login = () => {
		dispatch(api.signIn(email, password));
	};

	return (
		<div>
			<div className="main-wrapper login-body">
				<div className="login-wrapper">
					<div className="container">
						<div className="loginbox">
							<div className="login-left">
								<img
									className="img-fluid"
									src={Logo}
									alt="Logo"
								/>
							</div>
							<div className="login-right">
								<div className="login-right-wrap">
									<h1>Connexion</h1>
									<p className="account-subtitle">
										Accédez au tableau de bord
									</p>
									{error && (
										<div className="alert alert-danger">
											{error.message}
										</div>
									)}
									{user && user.role !== "admin" && (
										<div className="alert alert-danger">
											Vous n'avez pas les droits
											nécessaires pour vous consulter
											cette page. Veuiller vous connectez avec le bon compte
										</div>
									)}
									<form>
										<div className="form-group">
											<input
												className="form-control"
												type="text"
												placeholder="Email"
												onChange={(event) =>
													setEmail(event.target.value)
												}
											/>
										</div>
										<div className="form-group">
											<input
												className="form-control"
												type="password"
												placeholder="Mot de Passe"
												onChange={(event) =>
													setPassword(
														event.target.value
													)
												}
											/>
										</div>
										<div className="form-group">
											{loading ? (
												<button
													className="btn btn-primary btn-block"
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
													className="btn btn-primary btn-block"
													type="submit"
													onClick={login}
												>
													Connexion
												</button>
											)}
										</div>
									</form>

									<div className="text-center forgotpass">
										<Link to="/admin/forgot-password">
											Mode passe oublié?
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

export default Login;
