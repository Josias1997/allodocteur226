import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import IMG01  from '../../../assets/images/patient2.jpg';

class Checkout extends Component{

	handleChange=()=>{
		this.props.history.push("/patient/booking-success");
	}
    render(){
        return(
                <div>
                
			<div className="content">
				<div className="container">

					<div className="row">
						<div className="col-md-7 col-lg-8">
							<div className="card">
								<div className="card-body">
								
								
									<form action="/patient/booking-success">
									
									
										<div className="info-widget">
											<h4 className="card-title">Informations Personnels</h4>
											<div className="row">
												<div className="col-md-6 col-sm-12">
													<div className="form-group card-label">
														<label>Nom</label>
														<input className="form-control" type="text" />
													</div>
												</div>
												<div className="col-md-6 col-sm-12">
													<div className="form-group card-label">
														<label>Prénom</label>
														<input className="form-control" type="text" />
													</div>
												</div>
												<div className="col-md-6 col-sm-12">
													<div className="form-group card-label">
														<label>Email</label>
														<input className="form-control" type="email" />
													</div>
												</div>
												<div className="col-md-6 col-sm-12">
													<div className="form-group card-label">
														<label>Numéro de Téléphone</label>
														<input className="form-control" type="text" />
													</div>
												</div>
											</div>
											<div className="exist-customer">Vous avez un compte? 
											<Link to="/patient/checkout">Cliquez ici pour vous connecter</Link></div>
										</div>
										
										
										<div className="payment-widget">
											<h4 className="card-title">Méthode de Paiement</h4>
											
										
											<div className="payment-list">
												<label className="payment-radio credit-card-option">
													<input type="radio" name="radio" defaultChecked />
													<span className="checkmark"></span>
													Orange Money
												</label>
											</div>	
											<div className="payment-list">
												<label className="payment-radio paypal-option">
													<input type="radio" name="radio" />
													<span className="checkmark"></span>
													Mobicash
												</label>
											</div>
											
											<div className="terms-accept">
												<div className="custom-checkbox">
												   <input type="checkbox" id="terms_accept" />
												   <label htmlFor="terms_accept">J'ai lu et j'accepte <a href="#0">Termes &amp; Conditions</a></label>
												</div>
											</div>
											
											<div className="submit-section mt-4">
												<button type="submit"
												 className="btn btn-primary submit-btn"
												 onClick={this.handleChange.bind(this)}>Confirmer et Payer</button>
											</div>
										
											
										</div>
									</form>
								
								</div>
							</div>
							
						</div>
						
						<div className="col-md-5 col-lg-4 theiaStickySidebar">
						
						
							<div className="card booking-card">
								<div className="card-header">
									<h4 className="card-title">Booking Summary</h4>
								</div>
								<div className="card-body">
								
								
									<div className="booking-doc-info">
										<Link to="/patient/doctor-profile" className="booking-doc-img">
											<img src={IMG01} alt="User" />
										</Link>
										<div className="booking-info">
											<h4><Link to="/patient/doctor-profile">Dr. Darren Elder</Link></h4>
											<div className="rating">
												<i className="fas fa-star filled"></i>
												<i className="fas fa-star filled"></i>
												<i className="fas fa-star filled"></i>
												<i className="fas fa-star filled"></i>
												<i className="fas fa-star"></i>
												<span className="d-inline-block average-rating">35</span>
											</div>
											<div className="clinic-details">
												<p className="doc-location"><i className="fas fa-map-marker-alt"></i> Newyork, USA</p>
											</div>
										</div>
									</div>
							
									<div className="booking-summary">
										<div className="booking-item-wrap">
											<ul className="booking-date">
												<li>Date <span>16 Nov 2019</span></li>
												<li>Heure <span>10:00 AM</span></li>
											</ul>
											<ul className="booking-fee">
												<li>Frais de consulation <span>100 FCFA</span></li>
												<li>Frais de réservation <span>10 FCFA</span></li>
												<li>Frais d'appel <span>50 FCFA</span></li>
											</ul>
											<div className="booking-total">
												<ul className="booking-total-list">
													<li>
														<span>Total</span>
														<span className="total-cost">160 FCFA</span>
													</li>
												</ul>
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
    }
}

export default Checkout;