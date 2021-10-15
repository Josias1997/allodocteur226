import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from 'common';
import Nav from 'react-bootstrap/Nav';
import IMG01 from '../../../assets/images/doctor-thumb-02.jpg';


const DoctorSidebar = () => {
    const { api } = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    return(
        <div className="profile-sidebar">
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    <Link to="#" className="booking-doc-img">
                        <img src={IMG01} alt="User" />
                    </Link>
                    <div className="profile-det-info">
                        <h3>Dr. {user?.firstName} {user?.lastName}</h3>
                        
                        <div className="patient-details">
                            <h5 className="mb-0">{user?.speciality}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-widget">
                           
                <Nav className="dashboard-menu">
                    <Nav.Item> 
                         <NavLink to="/doctor/doctor-dashboard"> 
                            <i className="fas fa-columns"></i>
                                <span>Tableau de bord</span>
                         </NavLink>
                     </Nav.Item>
                     
                     <Nav.Item> 
                        <NavLink to="/doctor/appointments"  activeClassName="active">
                            <i className="fas fa-calendar-check"></i>
                            <span>Consultations</span> 
                        </NavLink>
                    </Nav.Item> 
                    <Nav.Item> 
                        <NavLink to="/doctor/patients"  activeClassName="active">
                            <i className="fas fa-user"></i>
                            <span>Mes patients</span> 
                        </NavLink>
                    </Nav.Item>  
                    <Nav.Item> 
                        <NavLink to="/doctor/chat-doctor">
                        <i className="fas fa-comments"></i>
                        <span>Messages</span>
                    </NavLink>
                    </Nav.Item>  
                    <Nav.Item> 
                        <NavLink to="/doctor/profile-setting">
                            <i className="fas fa-user-cog"></i>
                            <span>Paramètres Profil</span>
                        </NavLink> 
                        </Nav.Item> 
                    <Nav.Item> 
                        <NavLink to="/doctor-change-passwword">
                            <i className="fas fa-lock"></i>
                            <span>Changer le mot de passe</span>
                        </NavLink>
                    </Nav.Item> 
                    <Nav.Item> 
                        <NavLink onClick={() => dispatch(api.signOut())} to="/home" activeClassName="active">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Déconnexion</span>
                        </NavLink>
                    </Nav.Item> 
                </Nav> 
              
            </div>
        </div>
    );
}
export default DoctorSidebar;
   