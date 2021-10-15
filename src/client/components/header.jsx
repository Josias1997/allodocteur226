import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from "common";
//icon

import { faHospital } from "@fortawesome/free-regular-svg-icons";
import logo from "../assets/images/logo.png";
import IMG01 from "../assets/images/doctors/doctor-thumb-02.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import $ from "jquery";
import { useEffect } from "react";

const Header = (props) => {
  const { api } = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
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
          <Link to="/" className="navbar-brand logo">
            <h3>AlloDocteur226</h3>
          </Link>
        </div>
        <div className="main-menu-wrapper">
          <div className="menu-header">
            <Link to="/" className="menu-logo">
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
          <ul className="main-nav ml-5">
            {/* <li className={`${pathnames === "/home" ? "active" : ""}`}>
            <a href="/home" to="/home">
            Home
              </a>
            </li> */}
            <li className={pathnames.includes("home") ? "active" : ""}>
              <Link to="/home" onClick={()=>onhandleCloseMenu()}>Accueil</Link>
            </li>
            <li className={`has-submenu ${url.includes("choose-speciality") ? "active" : ""}`}>
              <a href="#0">
                Réservation<i className="fas fa-chevron-down" aria-hidden="true"></i>
              </a>
              <ul className={`submenu`}>
                <li>
                  <Link to="/patient/choose-speciality/online" onClick={()=>onhandleCloseMenu()}>Consultation en ligne</Link>
                </li>
                <li>
                  <Link to="/patient/choose-speciality/home" onClick={()=>onhandleCloseMenu()}>Consultation à domicile</Link>
                </li>
              </ul>
            </li>
            <li className={pathnames.includes("patient-chat") ? "active" : ""}>
              <Link to="/patient/patient-chat" onClick={()=>onhandleCloseMenu()}>Discuter</Link>
            </li>
            <li className={pathnames.includes("choose-package") ? "active" : ""}>
              <Link to="/patient/choose-package" onClick={()=>onhandleCloseMenu()}>Assurance Maladies</Link>
            </li>
            {/* <li>
              <a href="/admin" target="_blank" to="/admin">
                Admin
              </a>
            </li> */}
            {user ? (<li className="login-link" onClick={()=>onhandleCloseMenu()}>
                <i className="fa fa-user"></i>
               <Link to={user.role === "patient" ? "/patient/dashboard" : "/doctor/doctor-dashboard"}>Profil</Link>
             </li>) :
            <li className="login-link" onClick={() => onhandleCloseMenu()}>
               <Link to="/login">Connexion / Inscription</Link>
             </li>
           }
          </ul>
        </div>
        <ul className="nav header-navbar-rht">
          {!user && <li className="nav-item contact-item">
                      <div className="header-contact-img">
                        <i className="far fa-hospital" />
                      </div>
                      <div className="header-contact-detail">
                        <p className="contact-header">Contact</p>
                        <p className="contact-info-header"> +226 75 83 32 34</p>
                      </div>
                    </li>}

          {user ? (
            <>
              <Dropdown className="user-drop nav-item dropdown has-arrow logged-item">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <img
                    className="rounded-circle"
                    src={IMG01}
                    width="31"
                    alt={user?.firstName}
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
                      <h6>{user?.firstName} {user?.lastName}</h6>
                      <p className="text-muted mb-0">{user?.role === "doctor" ? "Docteur" : "Patient"}</p>
                    </div>
                  </div>
                  <Dropdown.Item href={user.role === "doctor" ? "/doctor/doctor-dashboard" : "/patient/dashboard"}>
                   Tableau de bord
                  </Dropdown.Item>
                  <Dropdown.Item href={user.role === "doctor" ? "/doctor/profile-setting" : "/patient/profile"}>
                    Paramètres Profil
                  </Dropdown.Item>
                  <Dropdown.Item href="/" onClick={() => dispatch(api.signOut())} >Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
            <li className="login-link" onClick={() => onhandleCloseMenu()}>
               <Link to="/login">Connexion / Inscription</Link>
             </li>
           {" "}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
