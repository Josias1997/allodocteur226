import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from "common";
import PatientSidebar from "../patienttsidebar";

const AddPescription = () => {
	const { api } = useContext(FirebaseContext);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);

	return (
		<div>
			<div className="breadcrumb-bar">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-md-12 col-12">
							<nav
								aria-label="breadcrumb"
								className="page-breadcrumb"
							>
								<ol className="breadcrumb">
									<li className="breadcrumb-item">
										<a href="/home">Accueil</a>
									</li>
									<li
										className="breadcrumb-item active"
										aria-current="page"
									>
										Ajouter une prescription
									</li>
								</ol>
							</nav>
							<h2 className="breadcrumb-title">
								Ajouter une prescription
							</h2>
						</div>
					</div>
				</div>
			</div>
			<div className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
							<div className="profile-sidebar">
								<PatientSidebar />
							</div>
						</div>
						<div className="col-md-7 col-lg-8 col-xl-9">
							<div className="card">
								<div className="card-header">
									<h4 className="card-title mb-0">
										Ajouter une prescription
									</h4>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-sm-6">
											<div className="biller-info">
												<h4 className="d-block">
													Dr. {user?.firstName}{" "}
													{user?.lastName}
												</h4>
												<span className="d-block text-sm text-muted">
													{user?.speciality}
												</span>
												<span className="d-block text-sm text-muted">
													{user?.city} {user?.country}
												</span>
											</div>
										</div>
										<div className="col-sm-6 text-sm-right">
											<div className="billing-info">
												<h4 className="d-block">
													1 November 2019
												</h4>
												<span className="d-block text-muted">
													#INV0001
												</span>
											</div>
										</div>
									</div>

									<div className="add-more-item text-right">
										<a href="#0">
											<i className="fas fa-plus-circle"></i>{" "}
											Ajouter
										</a>
									</div>

									<div className="card card-table">
										<div className="card-body">
											<div className="table-responsive">
												<table className="table table-hover table-center">
													<thead>
														<tr>
															<th
																style={{
																	minWwidth:
																		"200p",
																}}
															>
																Nom
															</th>
															<th
																style={{
																	minWidth:
																		"80px",
																}}
															>
																Quantité
															</th>
															<th
																style={{
																	minWidth:
																		"80px",
																}}
															>
																Jours
															</th>
															<th
																style={{
																	minwWidth:
																		"100px",
																}}
															>
																Temps
															</th>
															<th
																style={{
																	minWidth:
																		"80px",
																}}
															></th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<input
																	className="form-control"
																	type="text"
																/>
															</td>
															<td>
																<input
																	className="form-control"
																	type="text"
																/>
															</td>
															<td>
																<input
																	className="form-control"
																	type="text"
																/>
															</td>
															<td>
																<div className="form-check form-check-inline">
																	<label className="form-check-label">
																		<input
																			className="form-check-input"
																			type="checkbox"
																		/>{" "}
																		Matin
																	</label>
																</div>
																<div className="form-check form-check-inline">
																	<label className="form-check-label">
																		<input
																			className="form-check-input"
																			type="checkbox"
																		/>{" "}
																		Midi
																	</label>
																</div>
																<div className="form-check form-check-inline">
																	<label className="form-check-label">
																		<input
																			className="form-check-input"
																			type="checkbox"
																		/>{" "}
																		Soir
																	</label>
																</div>
																<div className="form-check form-check-inline">
																	<label className="form-check-label">
																		<input
																			className="form-check-input"
																			type="checkbox"
																		/>{" "}
																		Nuit
																	</label>
																</div>
															</td>
															<td>
																<a
																	href="#0"
																	className="btn bg-danger-light trash"
																>
																	<i className="far fa-trash-alt"></i>
																</a>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-md-12 text-right">
											<div className="signature-wrap">
												<div className="signature">
													Cliquer ici pour signer
												</div>
												<div className="sign-name">
													<p className="mb-0">
														( Dr. {user?.firstName}{" "}
														{user?.lastName} )
													</p>
													<span className="text-muted">
														Signature
													</span>
												</div>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-md-12">
											<div className="submit-section">
												<button
													type="submit"
													className="btn btn-primary submit-btn"
												>
													Enregistrer
												</button>
												<button
													type="reset"
													className="btn btn-secondary submit-btn"
												>
													Effacer
												</button>
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
};

export default AddPescription;
