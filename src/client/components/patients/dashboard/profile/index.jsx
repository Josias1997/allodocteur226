import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from 'common';

import DashboardSidebar from '../sidebar/sidebar.jsx';
import IMG01 from '../../../../assets/images/patient.jpg';
import StickyBox from "react-sticky-box";


const Profile = () => { 
    const { api } = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const [firstName, setFirstName] = useState(user?.firstName ? user?.firstName : "");
    const [lastName, setLastName] = useState(user?.lastName ? user?.lastName : "");
    const [birthDate, setBirthDate] = useState(user?.birthDate ? user?.birthDate : "");
    const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup ? user?.bloodGroup : "");
    const [email, setEmail] = useState(user?.email ? user?.email : "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ? user?.phoneNumber : "");
    const [address, setAddress] = useState(user?.address ? user?.address : "");
    const [city, setCity] = useState(user?.city ? user?.city : "");
    const [state, setState] = useState(user?.state ? user?.state : "");
    const [zipCode, setZipCode] = useState(user?.zipCode ? user?.zipCode : "");
    const [country, setCountry] = useState(user?.country ? user?.country : "");

    const saveChanges = () => {
        dispatch(api.updateUser(user.id, {
            firstName,
            lastName,
            birthDate,
            bloodGroup,
            email,
            phoneNumber,
            address,
            city,
            state,
            zipCode,
            country
        }))
    };

    return(
        <div>
            <div className="breadcrumb-bar">
    			<div className="container-fluid">
    				<div className="row align-items-center">
    					<div className="col-md-12 col-12">
    						<nav aria-label="breadcrumb" className="page-breadcrumb">
    							<ol className="breadcrumb">
    								<li className="breadcrumb-item"><a href="/home">Home</a></li>
    								<li className="breadcrumb-item active" aria-current="page">Paramètres Profil</li>
    							</ol>
    						</nav>
    						<h2 className="breadcrumb-title">Paramètres Profil</h2>
    					</div>
    				</div>
    			</div>
			</div>
            <div className="content">
				<div className="container-fluid">
					<div className="row">
					    <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                        <StickyBox offsetTop={20} offsetBottom={20}>
                            < DashboardSidebar />
                        </StickyBox>
                       </div>

                       <div className="col-md-7 col-lg-8 col-xl-9">
    <div className="card">
        <div className="card-body">
            
         
            <form>
                <div className="row form-row">
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <div className="change-avatar">
                                <div className="profile-img">
                                    <img src={IMG01} alt="User" />
                                </div>
                                <div className="upload-img">
                                    <div className="change-photo-btn">
                                        <span><i className="fa fa-upload"></i> Uploader une Photo</span>
                                        <input type="file" className="upload" />
                                    </div>
                                    <small className="form-text text-muted">Auotisé JPG, GIF or PNG. Taille Max 2MB</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nom</label>
                            <input type="text" onChange={event => setFirstName(event.target.value)} className="form-control" defaultValue={firstName} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Prénom</label>
                            <input type="text" onChange={event => setLastName(event.target.value)} className="form-control" defaultValue={lastName} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Date de Naissance</label>
                            <div className="cal-icon">
                                <input type="date" onChange={event => setBirthDate(event.target.value)} className="form-control datetimepicker" defaultValue={birthDate} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Groupe Sanguin</label>
                            <select className="form-control select" value={bloodGroup} onChange={event => setBloodGroup(event.target.value)}>
                                <option>A-</option>
                                <option>A+</option>
                                <option>B-</option>
                                <option>B+</option>
                                <option>AB-</option>
                                <option>AB+</option>
                                <option>O-</option>
                                <option>O+</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" onChange={event => setEmail(event.target.value)} className="form-control" defaultValue={email} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Mobile</label>
                            <input type="text" onChange={event => setPhoneNumber(event.target.value)} defaultValue={phoneNumber} className="form-control" />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                        <label>Addresse</label>
                            <input type="text" onChange={event => setAddress(event.target.value)} className="form-control" defaultValue={address} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Ville</label>
                            <input type="text" onChange={event => setCity(event.target.value)} className="form-control" defaultValue={city} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Etat / Province</label>
                            <input type="text" onChange={event => setState(event.target.value)} className="form-control" defaultValue={state} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Code Postal</label>
                            <input type="text" onChange={event => setZipCode(event.target.value)} className="form-control" defaultValue={zipCode} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Pays</label>
                            <input type="text" onChange={event => setCountry(event.target.value)} className="form-control" defaultValue={country} />
                        </div>
                    </div>
                </div>
                <div className="submit-section">
                    <button type="submit" className="btn btn-primary submit-btn">Enregistrer</button>
                </div>
            </form>
           
            
        </div>
    </div>
    </div>
            </div>
        </div>
    </div>      
    </div>
    );
} 
export default Profile;   
        

