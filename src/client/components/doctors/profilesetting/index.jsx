import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from 'common';
import DoctorSidebar from '../sidebar/index';
import IMG01 from '../../../assets/images/doctor-thumb-02.jpg';
import IMG02 from '../../../assets/images/feature-01.jpg';
import IMG03 from '../../../assets/images/feature-02.jpg';
import {DropzoneArea} from 'material-ui-dropzone'

const ProfileSetting = () => {

    const { api } = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [files, setFiles] = useState([]);
    const [username, setUsername] = useState(user?.username ? user?.username : "");
    const [firstName, setFirstName] = useState(user?.firstName ? user?.firstName : "");
    const [lastName, setLastName] = useState(user?.lastName ? user?.lastName : "");
    const [birthDate, setBirthDate] = useState(user?.birthDate ? user?.birthDate : "");
    const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup ? user?.bloodGroup : "");
    const [email, setEmail] = useState(user?.email ? user?.email : "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ? user?.phoneNumber : "");
    const [gender, setGender] = useState(user?.gender ? user?.gender : "");
    const [addressLine1, setAddressLine1] = useState(user?.addressLine1 ? user?.addressLine1 : "");
    const [addressLine2, setAddressLine2] = useState(user?.addressLine2 ? user?.addressLine2 : "");
    const [city, setCity] = useState(user?.city ? user?.city : "");
    const [state, setState] = useState(user?.state ? user?.state : "");
    const [zipCode, setZipCode] = useState(user?.zipCode ? user?.zipCode : "");
    const [country, setCountry] = useState(user?.country ? user?.country : "");
    const [services, setServices] = useState(user?.services ? user?.services : "");
    const [speciality, setSpeciality] = useState(user?.speciality ? user?.speciality : "");
	
	const handleChange = (files) => {
		setFiles(files);
	};

	const saveChanges = () => {
		dispatch(api.updateUser(user.id, {
			firstName,
			lastName,
			birthDate,
			bloodGroup,
			email,
			phoneNumber,
			gender,
			addressLine1,
			addressLine2,
			city, 
			state,
			zipCode,
			country,
			services,
			speciality
		}))
	}

	return(
    <div>
        <div className="breadcrumb-bar">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-12 col-12">
                        <nav aria-label="breadcrumb" className="page-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/home">Accueil</a></li>
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
						
						<DoctorSidebar />
							
						</div>
						<div className="col-md-7 col-lg-8 col-xl-9">
						
						
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Information Basique</h4>
									<div className="row form-row">
										<div className="col-md-12">
											<div className="form-group">
												<div className="change-avatar">
													<div className="profile-img">
														<img src={IMG01} alt="User"/>
													</div>
													<div className="upload-img">
														<div className="change-photo-btn">
															<span><i className="fa fa-upload"></i> Uploader une Photo</span>
															<input type="file" className="upload" />
														</div>
														<small className="form-text text-muted">Autorisé JPG, GIF or PNG.Taille Max 2MB</small>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label>Nom d'utilisateur <span className="text-danger">*</span></label>
												<input type="text" defaultValue={username}
												onChange={event => setUsername(event.target.value)} 
												className="form-control" readOnly />
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label>Email <span className="text-danger">*</span></label>
												<input type="email"
												defaultValue={email}
												onChange={event => setEmail(event.target.value)}
												className="form-control" readOnly/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label>Nom <span className="text-danger">*</span></label>
												<input defaultValue={firstName}
												onChange={event => setFirstName(event.target.value)} type="text" className="form-control" />
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label>Prénom <span className="text-danger">*</span></label>
												<input defaultValue={lastName}
												onChange={event => setLastName(event.target.value)} type="text" className="form-control"/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label>Numéro de Téléphone</label>
												<input defaultValue={phoneNumber}
												onChange={event => setPhoneNumber(event.target.value)} type="text" className="form-control" />
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label>Genre</label>
												<select defaultValue={gender}
												onChange={event => setGender(event.target.value)} className="form-control select">
													<option>Select</option>
													<option>Male</option>
													<option>Female</option>
												</select>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group mb-0">
												<label>Date de Naissance</label>
												<input defaultValue={birthDate}
												onChange={event => setBirthDate(event.target.value)} type="text" className="form-control" />
											</div>
										</div>
									</div>
								</div>
							</div>
						
							<div className="card contact-card">
								<div className="card-body">
									<h4 className="card-title">Détails Contact</h4>
									<div className="row form-row">
										<div className="col-md-6">
											<div className="form-group">
												<label>Addresse Ligne 1</label>
												<input defaultValue={addressLine1}
												onChange={event => setAddressLine1(event.target.value)} type="text" className="form-control" />
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="control-label">Addresse Ligne 2</label>
												<input defaultValue={addressLine2}
												onChange={event => setAddressLine2(event.target.value)} type="text" className="form-control" />
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="control-label">Ville</label>
												<input defaultValue={city}
												onChange={event => setCity(event.target.value)} type="text" className="form-control" />
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label className="control-label">Etat / Province</label>
												<input defaultValue={state}
												onChange={event => setState(event.target.value)} type="text" className="form-control" />
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="control-label">Pays</label>
												<input defaultValue={country}
												onChange={event => setCountry(event.target.value)} type="text" className="form-control" />
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="control-label">Code Postal</label>
												<input defaultValue={zipCode}
												onChange={event => setZipCode(event.target.value)} type="text" className="form-control" />
											</div>
										</div>
									</div>
								</div>
							</div>
					
							<div className="card services-card">
								<div className="card-body">
									<h4 className="card-title">Services and Spécialisation</h4>
									<div className="col-md-6">
										<div className="form-group">
											<label className="control-label">Services</label>
											<input defaultValue={services}
												onChange={event => setServices(event.target.value)} type="text" className="form-control" />
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label className="control-label">Spécialisation</label>
											<input defaultValue={speciality}
												onChange={event => setSpeciality(event.target.value)} type="text" className="form-control" />
										</div>
									</div>
								</div>              
							</div>	
							<div className="submit-section submit-btn-bottom">
								<button onClick={saveChanges} type="submit" className="btn btn-primary submit-btn">Enregistrer</button>
							</div>
							
						</div>
					</div>

				</div>

			</div>	
        </div>
     
    );
}

export default ProfileSetting;