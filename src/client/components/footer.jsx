import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/footer-logo.png";
const Footer = (props) => {
  const exclusionArray = [
    "/pages/doctor-grid",
    "/pages/doctor-list",
    "/pages/video-call",
    "/pages/voice-call",
    "/pages/chat-doctor",
    "/patient/doctor-list",
    "/patient/doctor-grid",
  ];
  if (exclusionArray.indexOf(props.location.pathname) >= 0) {
    return "";
  }
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget footer-about">
                <div className="footer-logo">
                  <h1>AlloDocteur226</h1>
                </div>
                <div className="footer-about-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.{" "}
                  </p>
                  <div className="social-icon">
                    <ul>
                      <li>
                        <a href="#0">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#0">
                          <i className="fab fa-twitter"></i>{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#0">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#0">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#0">
                          <i className="fab fa-dribbble"></i>{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">Pour les patients</h2>
                <ul>
                  <li>
                    <Link to="/patient/search-doctor">Recherche des docteurs</Link>
                  </li>
                  <li>
                    <Link to="/login">Connexion</Link>
                  </li>
                  <li>
                    <Link to="/register">Inscription</Link>
                  </li>
                  <li>
                    <Link to="/patient/booking">Réservation</Link>
                  </li>
                  <li>
                    <Link to="/patient/dashboard">Tableau de bord patient</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">Pour les docteurs</h2>
                <ul>
                  <li>
                    <Link to="/doctor/appointments">Rendez vous</Link>
                  </li>
                  <li>
                    <Link to="/doctor/chat-doctor">Chat</Link>
                  </li>
                  <li>
                    <Link to="/login">Connexion</Link>
                  </li>
                  <li>
                    <Link to="/doctor/doctor-register">Inscription</Link>
                  </li>
                  <li>
                    <Link to="/doctor/doctor-dashboard">Tableau de bord Docteur</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget footer-contact">
                <h2 className="footer-title">Contactez Nous</h2>
                <div className="footer-contact-info">
                  <div className="footer-address">
                    <span>
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </span>
                    <p>
                      {" "}
                      Ouagadougou Pissy, Secteur 27{" "}
                    </p>
                  </div>
                  <p>
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    +226 75 83 32 34
                  </p>
                  <p className="mb-0">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    dominioncode@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container-fluid">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <div className="copyright-text">
                  <p className="mb-0">
                    &copy; 2020 AlloDocteur226. Tous Droits réservés.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="copyright-menu">
                  <ul className="policy-menu">
                    <li>
                      <Link to="/pages/terms">Termes et Conditions</Link>
                    </li>
                    <li>
                      <Link to="/pages/privacy-policy">Confidentialité</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
