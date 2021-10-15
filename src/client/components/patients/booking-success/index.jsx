import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FirebaseContext } from 'common';

const BookingSuccess = () => {
  const { api } = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const speciality = JSON.parse(localStorage.getItem("@speciality"));
  const date = localStorage.getItem("@date");
  const timeSlot = localStorage.getItem("@timeSlot");

  useEffect(() => {
    dispatch(api.updateUploadStatus(null));
    dispatch(api.updateInsuranceAdded(false));
  }, []);

  return (
    <div className="content success-page-cont">
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card success-card">
                        <div className="card-body">
                            <div className="success-cont">
                                <i className="fas fa-check"></i>
                                <h3>{speciality.description ? "Paiment effectué avec succès" :
                                    "Consultation réservée avec Succès"}!
                                </h3>
                                {speciality.description ? <p><strong>{speciality.description}</strong></p> :
                              <p>Consultation en <strong>{speciality.name}</strong><br /> à la date du <strong>{date} {timeSlot}H00</strong></p>}
                                <Link to="/pages/invoice-view" className="btn btn-primary view-inv-btn">Voir Facture</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookingSuccess;
