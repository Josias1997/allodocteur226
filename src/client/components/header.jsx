import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//icon

import { faHospital } from "@fortawesome/free-regular-svg-icons";
import logo from "../assets/images/logo.png";
import IMG01 from "../assets/images/doctors/doctor-thumb-02.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import $ from "jquery";
import { useEffect } from "react";

const Header = (props) => {
  let pathnames = window.location.pathname

  const [active, setActive] = useState(false);
  const url = pathnames.split("/").slice(0, -1).join("/");

  const onHandleMobileMenu = () => {
    var root = document.getElementsByTagName("html")[0];
    root.classList.add("menu-opened");
  };

  const onhandleCloseMenu = () => {
    var root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
  };

  useEffect(() => {
    $(".main-nav a").on("click", function (e) {
      if ($(this).parent().hasClass("has-submenu")) {
        e.preventDefault();
      }
      if (!$(this).hasClass("submenu")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("submenu");
        $(this).next("ul").slideDown(350);
        $(this).addClass("submenu");
      } else if ($(this).hasClass("submenu")) {
        $(this).removeClass("submenu");
        $(this).next("ul").slideUp(350);
      }
    });
  }, []);


  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg header-nav">
        <div className="navbar-header">
          <a href="#0" id="mobile_btn" onClick={() => onHandleMobileMenu()}>
            <span className="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <Link to="/home" className="navbar-brand logo">
            <h3>AlloDocteur226</h3>
          </Link>
        </div>
        <div className="main-menu-wrapper">
          <div className="menu-header">
            <Link to="/home" className="menu-logo">
              <h3>AlloDocteur226</h3>
            </Link>
            <a
              href="#0"
              id="menu_close"
              className="menu-close"
              onClick={() => onhandleCloseMenu()}
            >
              <i className="fas fa-times"></i>
            </a>
          </div>
          <ul className="main-nav">
            {/* <li className={`${pathnames === "/home" ? "active" : ""}`}>
            <a href="/home" to="/home">
            Home
              </a>
            </li> */}
            <li className={pathnames.includes("home") ? "active" : ""}>
              <Link to="/home" onClick={()=>onhandleCloseMenu()}>Accueil</Link>
            </li>
            <li className={`has-submenu ${url.includes("/doctor") ? "active" : ""}`}>
              <a href="#0">
                Réservation<i className="fas fa-chevron-down" aria-hidden="true"></i>
              </a>
              <ul className={`submenu`}>
                <li className={pathnames.includes("search-doctor") ? "active" : ""}>
                  <Link to="/patient/search-doctor/online" onClick={()=>onhandleCloseMenu()}>Consultation en ligne</Link>
                </li>
                <li className={pathnames.includes("search-doctor") ? "active" : ""}>
                  <Link to="/patient/search-doctor/home" onClick={()=>onhandleCloseMenu()}>Consultation à domicile</Link>
                </li>
              </ul>
            </li>
            <li className={pathnames.includes("patient-chat") ? "active" : ""}>
              <Link to="/patient/patient-chat" onClick={()=>onhandleCloseMenu()}>Discuter</Link>
            </li>
            {/* <li>
              <a href="/admin" target="_blank" to="/admin">
                Admin
              </a>
            </li> */}
            <li className="login-link" onClick={()=>onhandleCloseMenu()}>
              <Link to="/">Connexion / Inscription</Link>
            </li>
          </ul>
        </div>
        <ul className="nav header-navbar-rht">
          <li className="nav-item contact-item">
            <div className="header-contact-img">
              <i className="far fa-hospital" />							
            </div>
            <div className="header-contact-detail">
              <p className="contact-header">Contact</p>
              <p className="contact-info-header"> +226 75 83 32 34</p>
            </div>
          </li>

          {(props.location.pathname) === ("/pages/voice-call") || (props.location.pathname) === ("/pages/video-call") ? (
            <>
              <Dropdown className="user-drop nav-item dropdown has-arrow logged-item">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <img
                    className="rounded-circle"
                    src={IMG01}
                    width="31"
                    alt="Darren Elder"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="user-header">
                    <div className="avatar avatar-sm">
                      <img
                        src={IMG01}
                        alt="User"
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <div className="user-text">
                      <h6>Darren Elder</h6>
                      <p className="text-muted mb-0">Docteur</p>
                    </div>
                  </div>
                  <Dropdown.Item href="/doctor/doctor-dashboard">
                   Tableau de bord
                  </Dropdown.Item>
                  <Dropdown.Item href="/doctor/profile-setting">
                    Paramètres Profil
                  </Dropdown.Item>
                  <Dropdown.Item href="/login">Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link header-login">
                    Connexion / Inscription{" "}
                </Link>
              </li>{" "}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
