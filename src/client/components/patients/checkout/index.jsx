import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from "common";
import cinetpay from "cinetpay-nodejs";
import IMG01  from '../../../assets/images/patient2.jpg';

const API_KEY = '212474766360d9c79ee1b814.71148821';
const SITE_ID = 786215;

const cp = new cinetpay(API_KEY, SITE_ID, "https://kologojosias.com");

const Checkout = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	const insurancePaid = useSelector(state => state.auth.insurancePaid);
	const insuranceLoading = useSelector(state => state.auth.loading);
	const success = useSelector(state => state.appointmentdata.uploadSuccess);
	const loading = useSelector(state => state.appointmentdata.loading);
	const error = useSelector(state => state.appointmentdata.error);
	const [firstName, setFirstName] = useState(user?.firstName);
	const [lastName, setLastName] = useState(user?.lastName);
	const [email, setEmail] = useState(user?.email);
	const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
	const [address, setAddress] = useState(user?.address);
	const [city, setCity] = useState(user?.city);
	const [country, setCountry] = useState(user?.country);
	const [postalCode, setPostalCode] = useState(user?.postalCode);
	const [errorMessage, setErrorMessage] = useState("");
	const [checked, setChecked] = useState(false);
	const { api } = useContext(FirebaseContext);
	const date = localStorage.getItem("@date");
	const timeSlot = localStorage.getItem('@timeSlot');
	const bookingType = localStorage.getItem("@bookingType");
	const speciality = JSON.parse(localStorage.getItem("@speciality"))

	useEffect(() => {
		if(success || insurancePaid) {
			history.push("/patient/booking-success");
		}
	}, [success, insurancePaid])

	const book = (event) => {
		const transactionId = new Date().getTime();
		cp.pay(speciality.price, transactionId, 'XOF',
		speciality.description ? speciality.description : 'Consultation', speciality.name)
		.then(response => {
				cp.checkPayStatus(transactionId)
				.then(response => {
					createAppointment();
				}).catch(error => {
					setErrorMessage(error.message);
				})
		}).catch(error => {
			setErrorMessage(error.message);
		})
	};

	const createAppointment = () => {
		if (!checked) {
			return alert("Veuillez accepter les termes et conditions");
		}
		if (!speciality.description) {
			dispatch(api.createAppointment({
				patient: {
					firstName,
					lastName,
					email,
					phoneNumber,
					address,
					city,
					country,
					id: user.id
				},
				date: `${date} ${timeSlot}:00`,
				speciality: speciality,
				type: bookingType
			}))
		} else {
			dispatch(
				api.payForInsurance(user.id, speciality)
			);
		}
	}

	const handleCheckboxChange = event => {
		setChecked(event.target.checked);
	}

  return(
    <div>
			<div className="content">
				<div className="container">
					<div className="row">
						<div className="col-md-7 col-lg-8">
							<div className="card">
								<div className="card-body">
										{error && <div className="alert alert-danger">{error.message}</div>}
										<div className="info-widget">
											<h4 className="card-title">Informations Personnels</h4>
											<div className="row">
												<div className="col-md-6 col-sm-12">
													<div className="form-group card-label">
														<label>Nom</label>
														<input
															className="form-control"
															type="text"
															value={firstName}
															onChange={event => setFirstName(event.target.value)}
														/>
													</div>
												</div>
												<div className="col-md-6 col-sm-12">
													<div className="form-group card-label">
														<label>Prénom</label>
														<input
															className="form-control"
															type="text"
															value={lastName}
															onChange={event => setLastName(event.target.value)}
														/>
													</div>
												</div>
												<div className="col-md-6 col-sm-12">
													<div className="form-group card-label">
														<label>Email</label>
														<input
															className="form-control"
															type="email"
															value={email}
															onChange={event => setEmail(event.target.value)}
														/>
													</div>
												</div>
												<div className="col-md-6 col-sm-12">
													<div className="form-group card-label">
														<label>Numéro de Téléphone</label>
														<input
															className="form-control"
															type="text"
															value={phoneNumber}
															onChange={event => setPhoneNumber(event.target.value)}
														/>
													</div>
												</div>
											</div>
											{!user && <div className="exist-customer">
												Vous avez un compte?
												<Link to="/login?next=/patient/checkout">Cliquez ici pour vous connecter</Link>
										</div>}
										<div className="card contact-card">
											<div className="card-body">
												<h4 className="card-title">Détails Contact</h4>
												<div className="row form-row">
													<div className="col-md-6">
														<div className="form-group">
															<label>Adresse 1</label>
															<input
																type="text"
																className="form-control"
																value={address}
																onChange={event => setAddress(event.target.value)}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="control-label">Adresse 2</label>
															<input
																type="text"
																className="form-control"
																value={address}
																onChange={event => setAddress(event.target.value)}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="control-label">Ville</label>
															<input
																type="text"
																className="form-control"
																value={city}
																onChange={event => setCity(event.target.value)}
															/>
														</div>
													</div>

													<div className="col-md-6">
														<div className="form-group">
															<label className="control-label">Region / Province</label>
															<input type="text" className="form-control" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="control-label">Pays</label>
															<input
																type="text"
																className="form-control"
																value={country}
																onChange={event => setCountry(event.target.value)}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="control-label">Code Postal</label>
															<input
																type="text"
																className="form-control"
																value={postalCode}
																onChange={event => setPostalCode(event.target.value)}
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
										</div>
										<div className="payment-widget">
											<div className="terms-accept">
												<div className="custom-checkbox">
												   <input type="checkbox" id="terms_accept" onChange={handleCheckboxChange} />
												   <label htmlFor="terms_accept">J'ai lu et j'accepte <a href="/terms">Termes &amp; Conditions</a></label>
												</div>
											</div>
											<div className="submit-section mt-4">
												{loading || insuranceLoading ? (
													<button className="btn btn-primary btn-lg login-btn" type="button" disabled>
														<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
														Chargement...
													</button>
												) :
														<button
														 className="btn btn-primary submit-btn"
														 onClick={createAppointment}>Confirmer et Payer</button>
												}
											</div>
										</div>
								</div>
							</div>
						</div>
						<div className="col-md-5 col-lg-4 theiaStickySidebar">
							<div className="card booking-card">
								<div className="card-header">
									<h4 className="card-title">Récapitulatif Réservation</h4>
								</div>
								<div className="card-body">
									<div className="booking-doc-info">
										<div className="booking-doc-img">
											<img src={IMG01} alt="User" />
										</div>
										<div className="booking-info">
											<h4>{speciality.name}</h4>
										</div>
									</div>
									<div className="booking-summary">
										<div className="booking-item-wrap">
											<div className="booking-total">
												<ul className="booking-total-list">
													<li>
														<span>Total</span>
														<span className="total-cost">{speciality.price} FCFA</span>
													</li>
												</ul>
											</div>
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

export default Checkout;
