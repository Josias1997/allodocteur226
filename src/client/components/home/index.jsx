import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import HomeSearch from './search';
import HomeClinic from './clinic';
import { Doctor07,ImgPharmacy1,LabImage } from "./image.jsx";

const Home = () => {
  const history = useHistory();
  const user = useSelector(state => state.auth.user);

  return(
    <div>
      <div className="main-wrapper">
          <HomeSearch history={history} />
          <section className="section home-tile-section">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-9 m-auto">
                  <div className="section-header text-center">
                      <h2>Que recherchez-vous?</h2>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 mb-3">
                      <div className="card text-center doctor-book-card">
                          <img src={Doctor07} alt="" className="img-fluid" />
                          <div className="doctor-book-card-content tile-card-content-1">
                            <div onClick={() => history.push("/patient/choose-speciality/house")}>
                                <h3 className="card-title mb-0">Consultation à domicile</h3>
                                <button className="btn book-btn1 px-3 py-2 mt-3" tabIndex={0}>Réserver</button>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <div className="card text-center doctor-book-card">
                        <img src={ImgPharmacy1} alt="" className="img-fluid" />
                        <div className="doctor-book-card-content tile-card-content-1">
                          <div onClick={() => history.push("/patient/choose-speciality/online")}>
                              <h3 className="card-title mb-0">Consultation en ligne</h3>
                              <button className="btn book-btn1 px-3 py-2 mt-3" tabIndex={0}>Commencer</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <div className="card text-center doctor-book-card">
                        <img src={LabImage} alt="" className="img-fluid" />
                        <div className="doctor-book-card-content tile-card-content-1">
                            <div onClick={() => history.push("/patient/choose-package")}>
                                <h3 className="card-title mb-0">Assurance Maladie</h3>
                                <button className="btn book-btn1 px-3 py-2 mt-3" tabIndex={0}>
                                  Paiement
                                </button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </section>
        <HomeClinic />
      </div>
    </div>
  );
}
export default Home;
