import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from "common";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo-white.png";

const Register = () => {
	const { api } = useContext(FirebaseContext);
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [formError, setFormError] = useState(null);

	const error = useSelector((state) => state.auth.error);
	const loading = useSelector((state) => state.auth.loading);
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (user && user.role === "admin") {
			history.push("/admin");
		}
	}, [user])

	const register = () => {
		if (password !== confirmPassword) {
			return setFormError("Les mots de passe sont différents!");
		}
		dispatch(api.signUp(email, password, firstName, lastName, "000000", "admin"));
	};
	return (
		<div className="main-wrapper login-body">
			<div className="login-wrapper">
				<div className="container">
					<div className="loginbox">
						<div className="login-left">
							<img className="img-fluid" src={Logo} alt="Logo" />
						</div>
						<div className="login-right">
							<div className="login-right-wrap">
								<h1>Register</h1>
								<p className="account-subtitle">
									Access to our dashboard
								</p>
									{formError && (
										<div className="alert alert-danger">
											{formError}
										</div>
									)}
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
											placeholder="Nom"
											onChange={event => setFirstName(event.target.value)}
										/>
									</div>
									<div className="form-group">
										<input
											className="form-control"
											type="text"
											placeholder="Prénom"
											onChange={event => setLastName(event.target.value)}
										/>
									</div>
									<div className="form-group">
										<input
											className="form-control"
											type="text"
											placeholder="Email"
											onChange={event => setEmail(event.target.value)}
										/>
									</div>
									<div className="form-group">
										<input
											className="form-control"
											type="password"
											placeholder="Mot de passe"
											onChange={event => setPassword(event.target.value)}
										/>
									</div>
									<div className="form-group">
										<input
											className="form-control"
											type="password"
											placeholder="Confirmer le Mot de passe"
											onChange={event => setConfirmPassword(event.target.value)}
										/>
									</div>
									<div className="form-group mb-0">
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
													onClick={register}
												>
													Inscription
												</button>
											)}
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Register;
