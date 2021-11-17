import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactToPdf from 'react-to-pdf';

import {IMG01} from './img';
import moment from 'moment';


const InvoiceView = () => {
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const user = useSelector(state => state.auth.user);
  const speciality = JSON.parse(localStorage.getItem("@speciality"));
  const date = localStorage.getItem("@date");
  const timeSlot = localStorage.getItem("@timeSlot");
  const bookingType = localStorage.getItem("@bookingType");
  const pdfRef = useRef();
  return(
    <div>
  		<div className="content" ref={pdfRef}>
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-8 offset-lg-2">
							<div className="invoice-content">
								<div className="invoice-item">
									<div className="row">
										<div className="col-md-6">
											<div className="invoice-logo">
												<img src={IMG01} alt="logo" />
											</div>
										</div>
										<div className="col-md-6">
											<p className="invoice-details">
												<strong>Commande:</strong>#00124
												<strong> Tiré:</strong> {moment().format('LL')}
											</p>
										</div>
									</div>
								</div>
								<div className="invoice-item">
									<div className="row">
										<div className="col-md-6">
											<div className="invoice-info">
												<strong className="customer-text">Facture de AlloDocteur226</strong>
												<p className="invoice-details invoice-details-two">
                          {speciality.description ? "" : "Consultation"} {speciality.name}
												</p>
                        <p className="invoice-details invoice-details-two">{speciality.description}</p>
											</div>
										</div>
										<div className="col-md-6">
											<div className="invoice-info invoice-info2">
												<strong className="customer-text">Destination</strong>
												<p className="invoice-details">
                          {user?.firtName} {user?.lastName}
												</p>
											</div>
										</div>
									</div>
								</div>
							  <div className="invoice-item">
									<div className="row">
										<div className="col-md-12">
											<div className="invoice-info">
												<strong className="customer-text">Methode Paiement</strong>
												<p className="invoice-details invoice-details-two">
                          Orange Money
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="invoice-item invoice-table-wrap">
									<div className="row">
										<div className="col-md-12">
											<div className="table-responsive">
												<table className="invoice-table table table-bordered">
													<thead>
														<tr>
															<th>Description</th>
															<th className="text-center">Quantité</th>
															<th className="text-center">VAT</th>
															<th className="text-right">Total</th>
														</tr>
													</thead>
													<tbody>
                            {
                              speciality.description ? <tr>
  															<td>{speciality.description}</td>
  															<td className="text-center">1</td>
  															<td className="text-center">0 FCFA</td>
  															<td className="text-right">{speciality.price} FCFA</td>
  														</tr> : <tr>
  															<td>Consultation Général</td>
  															<td className="text-center">1</td>
  															<td className="text-center">0 FCFA</td>
  															<td className="text-right">{speciality.price} FCFA</td>
  														</tr>
                            }
                            {bookingType === "online" && <tr>
															<td>Frais de consulation en ligne</td>
															<td className="text-center">1</td>
															<td className="text-center">0 FCFA</td>
															<td className="text-right">5000 FCFA</td>
														</tr>}
													</tbody>
												</table>
											</div>
										</div>
										<div className="col-md-6 col-xl-4 ml-auto">
											<div className="table-responsive">
												<table className="invoice-table-two table">
													<tbody>
													<tr>
														<th>Somme Totale:</th>
														<td><span>{speciality.price} FCFA</span></td>
													</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
								<div className="other-info">
									<h4>Autre information</h4>
									<p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed dictum ligula, cursus blandit risus. Maecenas eget metus non tellus dignissim aliquam ut a ex. Maecenas sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae lorem interdum, eu scelerisque tellus fermentum. Curabitur sit amet lacinia lorem. Nullam finibus pellentesque libero.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
      <div className="col-md-12 my-4 d-flex justify-content-center">
        <ReactToPdf targetRef={pdfRef} filename="facture.pdf" options={{
            orientation: "landscape",
            unit: "in",
            format: [4,2]
          }} x={.5} y={.5} scale={0.8} onComplete={() => setGeneratingPdf(false)}>
          {({ toPdf }) => (
            <button
              onClick={() => {
                setGeneratingPdf(true);
                toPdf();
              }}
              className="btn btn-primary btn-lg"
            >
              {generatingPdf && <span className="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true"></span>}
              <i className="fa fa-download"></i>
              Télécharger Facture
            </button>
          )}
        </ReactToPdf>
      </div>
    </div>
  );
}
export default InvoiceView;
