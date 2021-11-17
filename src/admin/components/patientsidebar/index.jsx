import React, { Component } from "react";
import IMG01 from "../../assets/images/patient1.jpg";

import { Link } from "react-router-dom";
const PatientSidebar = ({ patient }) => {
	return (
		<div className="card widget-profile pat-widget-profile">
			<div className="card-body">
				<div className="pro-widget-content">
					<div className="profile-info-widget">
						<Link to="#0" className="booking-doc-img">
							<img src={IMG01} alt="User" />
						</Link>
						<div className="profile-det-info">
							<h3>{patient?.firstName} {patient?.lastName}</h3>

							<div className="patient-details">
								<h5>
									<b>Patient ID :</b> {patient?.id}
								</h5>
								<h5 className="mb-0">
									<i className="fas fa-map-marker-alt"></i>{" "}
									{patient?.address}
								</h5>
							</div>
						</div>
					</div>
				</div>
				<div className="patient-info">
					<ul>
						<li>
							Numéro <span>{patient?.phoneNumber}</span>
						</li>
						<li>
							Age <span>{patient?.age ? patient?.age : "Inconnu"}</span>
						</li>
						<li>
							Groupe Sanguin <span>{patient?.bloodGroup ? patient?.bloodGroup : "Néant"}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
export default PatientSidebar;
