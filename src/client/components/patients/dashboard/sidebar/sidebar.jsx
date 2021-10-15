import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { FirebaseContext } from "common";

import IMG01 from '../../../../assets/images/patient.jpg';


export const DashboardSidebar = () => {
	const { api } = useContext(FirebaseContext);
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	const history = useHistory();

	useEffect(() => {
		if (!user) {
			history.push("/login");
		}
	}, [user])

    return(
		<div className="profile-sidebar">
			<div className="widget-profile pro-widget-content">
				<div className="profile-info-widget">
					<a href="#0" className="booking-doc-img">
						<img src={IMG01} alt="User" />
					</a>
					<div className="profile-det-info">
						<h3>{user?.firstName} {user?.lastName}</h3>
						<div className="patient-details">
							<h5><i className="fas fa-birthday-cake"></i> {user?.birthDate}</h5>
							<h5 className="mb-0"><i className="fas fa-map-marker-alt"></i> {user?.address}</h5>
						</div>
					</div>
				</div>
			</div>
			<div className="dashboard-widget">
				<nav className="dashboard-menu">
					<ul>
						<li className="active">
							<Link to="/patient/dashboard">
								<i className="fas fa-columns"></i>
								<span>Tableau de bord</span>
							</Link>
						</li>
						<li>
							<Link to="/patient/patient-chat">
								<i className="fas fa-comments"></i>
								<span>Messages</span>
							</Link>
						</li>
						<li>
							<Link to="/patient/profile">
								<i className="fas fa-user-cog"></i>
								<span>Paramètres Profil</span>
							</Link>
						</li>
						<li>
							<Link to="/patient/change-password">
								<i className="fas fa-lock"></i>
								<span>Changer de mot de passe</span>
							</Link>
						</li>
						<li>
							<Link to="#" onClick={() => dispatch(api.signOut())}>
								<i className="fas fa-sign-out-alt"></i>
								<span>Déconnexion</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>

		</div>
    );
}
export default DashboardSidebar;
