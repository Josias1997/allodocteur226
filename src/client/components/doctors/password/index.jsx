import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from 'common';
import DashboardSidebar from '../sidebar/index';
import StickyBox from "react-sticky-box";

const Password = () => {
	const { api } = useContext(FirebaseContext);
	const dispatch = useDispatch();
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

	const changePassword = () => {

	};

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
						<StickyBox offsetTop={20} offsetBottom={20}>
                       		 < DashboardSidebar />
						</StickyBox>
                       </div>

                       <div className="col-md-7 col-lg-8 col-xl-9">
                                <div className="card">
                                     <div className="card-body">
                                     <form>
												<div className="form-group">
													<label>Ancien mot de passe</label>
													<input onChange={event => setOldPassword(event.target.value)} type="password" className="form-control" />
												</div>
												<div className="form-group">
													<label>Nouveau mot de passe</label>
													<input onChange={event => setNewPassword(event.target.value)} type="password" className="form-control" />
												</div>
												<div className="form-group">
													<label>Confirmer le mot de passe</label>
													<input onChange={event => setNewPasswordConfirm(event.target.value)} type="password" className="form-control" />
												</div>
												<div className="submit-section">
													<button onClick={changePassword} type="submit" className="btn btn-primary submit-btn">Save Changes</button>
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
export default Password;    
        

