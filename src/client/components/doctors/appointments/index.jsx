import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import { FirebaseContext } from 'common';
import {IMG01, IMG02, IMG03, IMG04, IMG05, IMG06, IMG07, IMG08, IMG010, IMG011} from './img';
import DoctorSidebar from '../sidebar';

const Appointments = () => { 
    const { api } = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState({});
    const appointments = useSelector(state => state.appointmentdata.appointments);
    const user = useSelector(state => state.auth.user);
    const history = useHistory();

    useEffect(() => {
        dispatch(api.fetchAppointments());
    }, [])

    const handleClose = ()=>{
        setShow(false);
    }

    const handleShow = (data)=>{
        setSelectedAppointment(data);
        setShow(true);
    }
    return(
            <div>
            <div className="breadcrumb-bar">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-12 col-12">
                        <nav aria-label="breadcrumb" className="page-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Appointments</li>
                            </ol>
                        </nav>
                        <h2 className="breadcrumb-title">Appointments</h2>
                    </div>
                </div>
            </div>
        </div>

        <div className="content">
				<div className="container-fluid">

					<div className="row">
						<div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                            <div className="appointments">
                            <StickyBox offsetTop={50} offsetBottom={20}>
                                  <DoctorSidebar />
                                  </StickyBox>
							</div>
                         </div>
                         <div className="col-md-7 col-lg-8 col-xl-9">
							<div className="appointments">
            {
                appointments.filter(appointment => appointment.doctor.id === user.id).map(data => (
                <div className="appointment-list">
                <div className="profile-info-widget">
                    <Link to="/doctor/patient-profile" className="booking-doc-img">
                        <img src={IMG01} alt="User" />
                    </Link>
                    <div className="profile-det-info">
                        <h3><Link to="/doctor/patient-profile">{data.patient.firstName} {data.patient.lastName}</Link></h3>
                        <div className="patient-details">
                            <h5><i className="far fa-clock"></i> {data.date}</h5>
                            <h5><i className="fas fa-map-marker-alt"></i>{data.patient.location}</h5>
                            <h5><i className="fas fa-envelope"></i>{data.patient.email}</h5>
                            <h5 className="mb-0"><i className="fas fa-phone"></i>{data.patient.phoneNumber}</h5>
                        </div>
                    </div>
                </div>
                <div className="appointment-action">
                    <Link to="#0" className="btn btn-sm bg-info-light" onClick={() => handleShow(data)}>
                        <i className="far fa-eye"></i> View
                    </Link>
                    <Link to="#0" className="btn btn-sm bg-success-light">
                        <i className="fas fa-check"></i> Accept
                    </Link>
                    <Link to="#0" className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times"></i> Cancel
                    </Link>
                </div>
            </div>
                ))
            }                    
        
			</div>
          </div>  
    </div>
</div> 
</div>            
    
            {/*view modal*/}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <h5 className="modal-title">Details Consultation</h5>
                </Modal.Header>
                <Modal.Body>
                    <ul className="info-details">
    					<li>
    						<div className="details-header">
    							<div className="row">
    								<div className="col-md-6">
    									<span className="title">#{selectedAppointment.id}</span>
    									<span className="text">{selectedAppointment.date}</span>
    								</div>
                                    {
                                        selectedAppointment?.type === "online" &&                                   <div className="col-md-6">
                                            <div className="text-right">
                                                <button 
                                                    onClick={() => history.push(`/doctor/chat-doctor?patient=${selectedAppointment?.patient?.id}`)} 
                                                    type="button" className="btn bg-success-light btn-sm" 
                                                    id="topup_status">
                                                    Commencer la consultation
                                                </button>
                                            </div>
                                        </div>
                                    }
    							</div>
    						</div>
    					</li>
    					<li>
    						<span className="title">Statut:</span>
    						<span className="text">Completed</span>
    					</li>
    					<li>
    						<span className="title">Date completion:</span>
    						<span className="text">29 Jun 2019</span>
    					</li>
    					<li>
    						<span className="title">Montant payé</span>
    						<span className="text">FCFA{selectedAppointment?.speciality?.price}</span>
    					</li>
    				</ul>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default Appointments;