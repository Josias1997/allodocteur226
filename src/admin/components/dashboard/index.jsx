import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from "common";

import { Redirect } from "react-router-dom";

import SidebarNav from "../sidebar";
import TableDoctor from "./tableDoctor";
import TablePatientsList from "./tablePatientList";
import TableAppointmentList from "./appointment";

const Dashboard = () => {
	const { api } = useContext(FirebaseContext);
	const dispatch = useDispatch();
	const users = useSelector((state) => state.admin.users);
	const user = useSelector((state) => state.auth.user);
	const appointments = useSelector(
		(state) => state.appointmentdata.appointments
	);

	useEffect(() => {
		dispatch(api.fetchUsers());
		dispatch(api.fetchAppointments());
		dispatch(api.fetchAdminPrescriptions());
	}, []);

	if (!user || user?.role !== "admin") {
		return <Redirect to="/admin/login" />;
	}

	return (
		<>
			<SidebarNav />
			<div className="page-wrapper">
				<div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title">Bienvenue Admin!</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
								</ul>
							</div>
						</div>
					</div>

					{/* breadcrumb */}

					<div className="row">
						<div className="col-xl-3 col-sm-6 col-12">
							<div className="card">
								<div className="card-body">
									<div className="dash-widget-header">
										<span className="dash-widget-icon text-primary border-primary">
											<i className="fe fe-users"></i>
										</span>
										<div className="dash-count">
											<h3>1</h3>
										</div>
									</div>
									<div className="dash-widget-info">
										<h6 className="text-muted">Docteurs</h6>
										<div className="progress progress-sm">
											<div className="progress-bar bg-primary w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6 col-12">
							<div className="card">
								<div className="card-body">
									<div className="dash-widget-header">
										<span className="dash-widget-icon text-success">
											<i className="fe fe-credit-card"></i>
										</span>
										<div className="dash-count">
											<h3>{users.length}</h3>
										</div>
									</div>
									<div className="dash-widget-info">
										<h6 className="text-muted">Patients</h6>
										<div className="progress progress-sm">
											<div className="progress-bar bg-success w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6 col-12">
							<div className="card">
								<div className="card-body">
									<div className="dash-widget-header">
										<span className="dash-widget-icon text-danger border-danger">
											<i className="fe fe-money"></i>
										</span>
										<div className="dash-count">
											<h3>{appointments.length}</h3>
										</div>
									</div>
									<div className="dash-widget-info">
										<h6 className="text-muted">Réservations</h6>
										<div className="progress progress-sm">
											<div className="progress-bar bg-danger w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*  row */}
					<div className="row">
						<div className="col-md-12 col-lg-12">
							<div className="card card-table flex-fill">
								<div className="card-header">
									<h4 className="card-title">Liste Patients</h4>
								</div>
								<div className="card-body">
									<TablePatientsList />
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 col-lg-12">
							<div className="card card-table flex-fill">
								<div className="card-header">
									<h4 className="card-title">Liste Consultations</h4>
								</div>
								<div className="card-body">
									<TableAppointmentList />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
