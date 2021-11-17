import React, { useState, useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from "common";
import { Modal } from 'react-bootstrap';
//icon

import { faHospital } from "@fortawesome/free-regular-svg-icons";
import logo from "../assets/images/logo.png";
import IMG01 from "../assets/images/doctors/doctor-thumb-02.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import $ from "jquery";
import { useEffect } from "react";
import Icon from '@material-ui/core/Icon';
import AgoraRTC from 'agora-rtc-sdk-ng';

import { useRTC, useRemoteVideoTrack } from "../../rtccontext";
const APP_ID = '37212e289fbf430fa31866c8b6af8559';

const Header = (props) => {
  const { api } = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const callData = useSelector(state => state.call.callData);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const rtc = useRTC();
  const { setRemoteVideoTrack } = useRemoteVideoTrack();

  useEffect(() => {
    rtc.current.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    rtc.current.client.on("user-published", async (user, mediaType) => {
      await rtc.current.client.subscribe(user, mediaType);
      console.log("user published");
      if (mediaType === 'audio') {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
      }
      if (mediaType === 'video') {
        console.log("video", user);
        setRemoteVideoTrack(user.videoTrack);
      }
      rtc.current.client.on("user-unpublished", async user => {
        await rtc.current.client.unsubscribe(user);
      });
    })
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(api.listenToCalls(user.id));
    }
  }, [user]);

  useEffect(() => {
    if (callData?.callType === "call") {
      setShowModal(true)
    } else {
      setShowModal(false);
    }
  }, [callData]);

  const joinVoiceCall = async (channel, token, callTarget) => {
    await rtc.current.client.join(APP_ID, channel, token, user.id);
    rtc.current.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.current.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    await rtc.current.client.publish([rtc.current.localAudioTrack, rtc.current.localVideoTrack]);
    setShowModal(false);
    dispatch(api.acceptCall(callData.caller.id));
    history.push({
      pathname: '/chat/call',
      state: { 
        callTarget: callTarget,
        callerId: callData.caller.id
      }
    })
  };
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
    $('.sidebar-overlay').removeClass('opened');
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
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>  
          <div className="call-box incoming-box">
            <div className="call-wrapper">
              <div className="call-inner">
                <div className="call-user">
                  <img alt="User" src={IMG01} className="call-avatar" />
                  <h4>{callData?.caller.firstName} {callData?.caller.lastName}</h4>
                  <span>Connection...</span>
                </div>              
                <div className="call-items">
                  <button onClick={() => setShowModal(false)} className="btn call-item call-end" data-dismiss="modal" aria-label="Close">
                    <Icon>call_end</Icon>
                  </button>
                  <button onClick={() => joinVoiceCall(callData?.channel, callData?.token, callData?.caller)} className="btn call-item call-start"><i className="material-icons">call</i></button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <nav className="navbar navbar-expand-lg header-nav">
        <div className="navbar-header">
          <a id="mobile_btn" onClick={() => onHandleMobileMenu()}>
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
              <Link to="/home" onClick={()=> onhandleCloseMenu()}>Accueil</Link>
            </li>
            <li className={`has-submenu ${url.includes("choose-speciality") ? "active" : ""}`}>
              <a href="#0">
                Réservation<i className="fas fa-chevron-down" aria-hidden="true"></i>
              </a>
              <ul className={`submenu`}>
                <li>
                  <Link to="/patient/choose-speciality/online" onClick={() => onhandleCloseMenu()}>Consultation en ligne</Link>
                </li>
                <li>
                  <Link to="/patient/choose-speciality/house" onClick={() => onhandleCloseMenu()}>Consultation à domicile</Link>
                </li>
              </ul>
            </li>
            <li className={pathnames.includes("/patient/chat") ? "active" : ""}>
              <Link to="/patient/chat" onClick={() => onhandleCloseMenu()}>Discuter</Link>
            </li>
            <li className={pathnames.includes("choose-package") ? "active" : ""}>
              <Link to="/patient/choose-package" onClick={() =>onhandleCloseMenu()}>Assurance Maladies</Link>
            </li>
            {/* <li>
              <a href="/admin" target="_blank" to="/admin">
                Admin
              </a>
            </li> */}
            {user ? (<li className="login-link" onClick={() => onhandleCloseMenu()}>
               <Link to={"/patient/dashboard"}>Profil</Link>
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
                      <p className="text-muted mb-0">Patient</p>
                    </div>
                  </div>
                  <Dropdown.Item href={"/patient/dashboard"}>
                   Tableau de bord
                  </Dropdown.Item>
                  <Dropdown.Item href={"/patient/profile"}>
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
