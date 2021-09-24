import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from "common";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import loginBanner from '../../../assets/images/login-banner.png';

const DoctorRegister = () => {
    const { api } = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);
    const loading = useSelector(state => state.auth.loading);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        document.body.classList.add('account-page');
        return () => {
            document.body.classList.remove('account-page');
        }
    }, []);

    useEffect(() => {
        if (user) {
            if (user.role === "doctor") {
                props.history.push('/doctor/doctor-dashboard');
            } else {
                props.history.push('/patient/dashboard');
            }
        }
    }, [user])

    const register = () => {
        dispatch(api.signUp(email, password, name, phoneNumber, "doctor"));
    };

    return(
        <div className="content">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-8 offset-md-2">
					
					
						<div className="account-content">
							<div className="row align-items-center justify-content-center">
								<div className="col-md-7 col-lg-6 login-left">
									<img src={loginBanner} className="img-fluid" alt="Login Banner" />	
								</div>
								<div className="col-md-12 col-lg-6 login-right">
									<div className="login-header">
										<h3>Inscription Docteur <Link to="/register">Êtes vous un patient?</Link></h3>
									</div>
                                  	{error && <div className="alert alert-danger">{error.message}</div>}
                                    <div className="form-group form-focus">
                                        <input 
                                            type="text" 
                                            className="form-control floating" 
                                            id="name"  
                                            onChange={event => setName(event.target.value)}
                                        />
                                        <label className="focus-label" htmlFor="name">Nom</label>
                                    </div>
                                    <div className="form-group form-focus">
                                        <input 
                                            type="text" 
                                            className="form-control floating" 
                                            id="mobile" 
                                            onChange={event => setPhoneNumber(event.target.value)} 
                                        />
                                        <label className="focus-label" htmlFor="mobile">Numéro de Téléphone</label>
                                    </div>
                                    <div className="form-group form-focus">
                                        <input 
                                            type="text" 
                                            className="form-control floating" 
                                            id="email" 
                                            onChange={event => setEmail(event.target.value)} 
                                        />
                                        <label className="focus-label" htmlFor="email">Email</label>
                                    </div>
                                    <div className="form-group form-focus">
                                        <input 
                                            type="password" 
                                            className="form-control floating" 
                                            id="password" 
                                            onChange={event => setPassword(event.target.value)}
                                        />
                                        <label className="focus-label" htmlFor="password">Créer un mot de passe</label>
                                    </div>
                                    <div className="text-right">
                                        <Link to="/login"className="forgot-link">Déjà Inscrit?</Link>
                                    </div>
									{loading ? (
										<button className="btn btn-primary btn-block btn-lg login-btn" type="button" disabled>
											<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
										  Chargement...
										</button>
										) : (
										<button className="btn btn-primary btn-block btn-lg login-btn" onClick={register}>
											Connexion
										</button>
									)
									}
                                    <div className="login-or">
                                        <span className="or-line"></span>
                                        <span className="span-or">ou</span>
                                    </div>
                                    <div className="row form-row social-login">
                                        <div className="col-6">
                                            <a href="#0" className="btn btn-facebook btn-block"><i className="fab fa-facebook-f mr-1"></i> Connexion</a>
                                        </div>
                                        <div className="col-6">
                                            <a href="#0" className="btn btn-google btn-block"><i className="fab fa-google mr-1"></i> Connexion</a>
                                        </div>
                                    </div>	
								</div>
							</div>
						</div>
						
							
					</div>
				</div>

			</div>

		</div>	
    );
}


export default DoctorRegister;