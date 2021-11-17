import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from "common";

import SidebarNav from "../sidebar";
import IMG01 from "../../assets/images/avatar-01.jpg";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

const Profile = () => {
	const { api } = useContext(FirebaseContext);
	const dispatch = useDispatch();

	const user = useSelector((state) => state.auth.user);
	const loading = useSelector((state) => state.auth.loading);
	const error = useSelector((state) => state.auth.error);

	const [key, setKey] = useState(1);
	const [show, setShow] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const [firstName, setFirstName] = useState(
		user?.firstName ? user?.firstName : ""
	);
	const [lastName, setLastName] = useState(
		user?.lastName ? user?.lastName : ""
	);
	const [birthDate, setBirthDate] = useState(
		user?.birthDate ? user?.birthDate : ""
	);
	const [email, setEmail] = useState(user?.email ? user?.email : "");
	const [phoneNumber, setPhoneNumber] = useState(
		user?.phoneNumber ? user?.phoneNumber : ""
	);
	const [address, setAddress] = useState(user?.address ? user?.address : "");
	const [city, setCity] = useState(user?.city ? user?.city : "");
	const [state, setState] = useState(user?.state ? user?.state : "");
	const [zipCode, setZipCode] = useState(user?.zipCode ? user?.zipCode : "");
	const [country, setCountry] = useState(user?.country ? user?.country : "");

	const handleSelect = (key) => {
		setKey(key);
	};

	const handleClose = () => {
		setShow(false);
	};

	const handleShow = () => {
		setShow(true);
	};

	const handleChange = (date) => {
		setStartDate(date);
	};

	const updatePassword = () => {};

	const updateUser = () => {
		dispatch(
			api.updateUser(user.id, {
				firstName,
				lastName,
				birthDate,
				email,
				phoneNumber,
				address,
				city,
				state,
				zipCode,
				country,
			})
		);
	};

	return (
		<div>
			<SidebarNav />
			<div className="page-wrapper">
				<div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col">
								<h3 className="page-title">Profil</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<a href="/admin">Tableau de bord</a>
									</li>
									<li className="breadcrumb-item active">
										Profil
									</li>
								</ul>
							</div>
						</div>
					</div>
					{/* page header */}
					<div className="row">
						<div className="col-md-12">
							<div className="profile-header">
								<div className="row align-items-center">
									<div className="col-auto profile-image">
										<Link to="">
											<img
												className="rounded-circle"
												alt="User"
												src={IMG01}
											/>
										</Link>
									</div>
									<div className="col ml-md-n2 profile-user-info">
										<h4 className="user-name mb-0">
											{user?.firstName} {user?.lastName}
										</h4>
										<h6 className="text-muted">
											{user?.email}
										</h6>
										<div className="user-Location">
											<i
												className="fa fa-map-marker"
												aria-hidden="true"
											></i>{" "}
											{user?.country}, {user?.city}
										</div>
										<div className="about-text">
											{user?.city}
										</div>
									</div>
									<div className="col-auto profile-btn">
										<button
											onClick={() => setKey(2)}
											className="btn btn-primary"
										>
											Modifier
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>{" "}
					{/* row */}
					<Tabs
						className="profile tab-view"
						activeKey={key}
						onSelect={handleSelect}
						id="controlled-tab-example"
					>
						<Tab
							className="nav-link"
							eventKey={1}
							title="Détails Personnels"
						>
							<div className="row">
								<div className="col-lg-12">
									<div className="card">
										<div className="card-body">
											<h5 className="card-title d-flex justify-content-between">
												<span>Détails Personnels</span>
												<button
													to=""
													className="btn btn-primary"
													onClick={handleShow}
												>
													<i className="fa fa-edit mr-1"></i>
													Modifier
												</button>
											</h5>
											<div className="row">
												<p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
													Nom & Prénom
												</p>
												<p className="col-sm-10">
													{user?.firstName}{" "}
													{user?.lastName}
												</p>
											</div>
											<div className="row">
												<p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
													Date de naissance
												</p>
												<p className="col-sm-10">
													{user?.birthDate}
												</p>
											</div>
											<div className="row">
												<p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
													Email
												</p>
												<p className="col-sm-10">
													{user?.email}
												</p>
											</div>
											<div className="row">
												<p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
													Mobile
												</p>
												<p className="col-sm-10">
													{user?.phoneNumber}
												</p>
											</div>
											<div className="row">
												<p className="col-sm-2 text-muted text-sm-right mb-0">
													Adresse
												</p>
												<p className="col-sm-10 mb-0">
													{user?.address}
													<br />
													{user?.city},
													<br />
													{user?.state},
													<br />
													{user?.country}.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Tab>

						<Tab className="nav-item" eventKey={2} title="Password">
							<div className="row">
								<div className="col-lg-12">
									<div className="card">
										<div className="card-body">
											<h5 className="card-title">
												Change Password
											</h5>
											<div className="row">
												<div className="col-md-10 col-lg-6">
													<form>
														<div className="form-group">
															<label>
																Old Password
															</label>
															<input
																type="password"
																onChange={(e) =>
																	setPassword(
																		e.target
																			.value
																	)
																}
																className="form-control"
															/>
														</div>
														<div className="form-group">
															<label>
																New Password
															</label>
															<input
																type="password"
																onChange={(e) =>
																	setNewPassword(
																		e.target
																			.value
																	)
																}
																className="form-control"
															/>
														</div>
														<div className="form-group">
															<label>
																Confirm Password
															</label>
															<input
																type="password"
																onChange={(e) =>
																	setConfirmNewPassword(
																		e.target
																			.value
																	)
																}
																className="form-control"
															/>
														</div>
														<button
															className="btn btn-primary"
															type="submit"
															onClick={
																updatePassword
															}
														>
															Save Changes
														</button>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Tab>
					</Tabs>
				</div>
			</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						<h5 className="modal-title">Personal Details</h5>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="modal-body">
						<div className="row form-row">
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Nom</label>
									<input
										type="text"
										className="form-control"
										value={firstName}
										onChange={(e) =>
											setFirstName(e.target.value)
										}
									/>
								</div>
							</div>
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Prénom</label>
									<input
										type="text"
										value={lastName}
										onChange={(e) =>
											setLastName(e.target.value)
										}
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-12">
								<div className="form-group">
									<label>Date de Naissance</label>
									<div className="cal-icon">
										<input
											type="text"
											value={birthDate}
											onChange={(e) =>
												setBirthDate(e.target.value)
											}
											className="form-control"
										/>
									</div>
								</div>
							</div>
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Email</label>
									<input
										type="email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Mobile</label>
									<input
										type="text"
										value={phoneNumber}
										onChange={(e) =>
											setPhoneNumber(e.target.value)
										}
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-12">
								<h5 className="form-title">
									<span>Adresse</span>
								</h5>
							</div>
							<div className="col-12">
								<div className="form-group">
									<label>Adresse</label>
									<input
										type="text"
										className="form-control"
										value={address}
										onChange={(e) =>
											setAddress(e.target.value)
										}
									/>
								</div>
							</div>
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>City</label>
									<input
										type="text"
										value={city}
										onChange={(e) =>
											setCity(e.target.value)
										}
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Région/Province</label>
									<input
										type="text"
										value={state}
										onChange={(e) =>
											setState(e.target.value)
										}
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Code Postal</label>
									<input
										type="text"
										value={zipCode}
										onChange={(e) =>
											setZipCode(e.target.value)
										}
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Pays</label>
									<input
										type="text"
										value={country}
										onChange={(e) =>
											setCountry(e.target.value)
										}
										className="form-control"
									/>
								</div>
							</div>
						</div>
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
								onClick={updateUser}
							>
								Valider
							</button>
						)}
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default Profile;
