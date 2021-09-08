import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import loginBanner from '../../assets/images/login-banner.png';
class Register extends Component {

    componentDidMount(){
        document.body.classList.add('account-page');
    }
    componentWillUnmount(){
		document.body.classList.remove('account-page');
	}
    render(){
        return(
            <div className="content">
            <div className="container-fluid">
                
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                            
                  
                        <div className="account-content">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-7 col-lg-6 login-left">
                                <img src={loginBanner} className="img-fluid" alt="Doccure Register" />	
                                </div>
                                <div className="col-md-12 col-lg-6 login-right">
                                    <div className="login-header">
                                        <h3>Inscription Patient <Link to="/doctor/doctor-register" >Êtes vous un docteur ?</Link></h3>
                                    </div>
                                    
                                  
                                    <form action="/doctor/doctor-dashboard">
                                        <div className="form-group form-focus">
                                            <input type="text" className="form-control floating" id="name" />
                                            <label className="focus-label" htmlFor="name">Nom</label>
                                        </div>
                                        <div className="form-group form-focus">
                                            <input type="text" className="form-control floating" id="mobile" />
                                            <label className="focus-label" htmlFor="mobile">Numéro de Téléphone</label>
                                        </div>
                                        <div className="form-group form-focus">
                                            <input type="password" className="form-control floating" id="password" />
                                            <label className="focus-label" htmlFor="password">Créer un mot de passe</label>
                                        </div>
                                        <div className="text-right">
                                            <Link to="/login"className="forgot-link">Déjà Inscrit?</Link>
                                        </div>
                                        <button className="btn btn-primary btn-block btn-lg login-btn" type="submit">Inscription</button>
                                        <div className="login-or">
                                            <span className="or-line"></span>
                                            <span className="span-or">ou</span>
                                        </div>
                                        <div className="row form-row social-login">
                                            <div className="col-6">
                                                <a href="#0" className="btn btn-facebook btn-block"><i className="fab fa-facebook-f mr-1"></i> Connexion</a>
                                            </div>
                                            <div className="col-6">
                                                <a href="#0" className="btn btn-google btn-block"><i className="fab fa-google mr-1"></i> Connexion</a>
                                            </div>
                                        </div>
                                    </form>
                                 
                                    
                                </div>
                            </div>
                        </div>
                        
                            
                    </div>
                </div>
        
            </div>
        
        </div>		
        )
    }
}

export default Register;