import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from "common";
import { Link, useLocation, useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logoicon from "../../assets/images/logo-small.png";
import avatar from "../../assets/images/avatar-01.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal } from "react-bootstrap";
import Icon from "@material-ui/core/Icon";
import AgoraRTC from "agora-rtc-sdk-ng";
import $ from "jquery";
import IMG01 from "../../assets/images/doctors/doctor-thumb-01.jpg";
import IMG02 from "../../assets/images/doctors/doctor-thumb-02.jpg";
import IMG03 from "../../assets/images/doctors/doctor-thumb-03.jpg";

import { useRTC, useRemoteVideoTrack } from "../../../rtccontext";
const APP_ID = "37212e289fbf430fa31866c8b6af8559";

const Header = () => {
  const { api } = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const callData = useSelector((state) => state.call.callData);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const rtc = useRTC();
  const { setRemoteVideoTrack } = useRemoteVideoTrack();
  const $menuItem = useRef();
  const location = useLocation();

  useEffect(() => {
    rtc.current.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    rtc.current.client.on("user-published", async (user, mediaType) => {
      await rtc.current.client.subscribe(user, mediaType);
      if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
      }
      if (mediaType === "video") {
        setRemoteVideoTrack(user.videoTrack);
      }
      rtc.current.client.on("user-unpublished", async (user) => {
        await rtc.current.client.unsubscribe(user);
      });
    });
    var Sidemenu = function () {
      $menuItem.current = $("#sidebar-menu a");
    };

    $("#toggle_btn").on("click", function (e) {
      if ($("body").hasClass("mini-sidebar")) {
        $("body").removeClass("mini-sidebar");
        $(".subdrop + ul").slideDown();
      } else {
        $("body").addClass("mini-sidebar");
        $(".subdrop + ul").slideUp();
      }
      return false;
    });

    if (location.pathname.split("/")[1] === "admin") {
      // require('../../assets/plugins/bootstrap-rtl/css/bootstrap.min.css')
      require("../..//assets/css/feathericon.min.css");
      require("../../assets/js/app.js");
      require("../../assets/js/jquery-3.2.1.min.js");
      require("../../assets/js/jquery.slimscroll.min.js");
      require("../../assets/plugins/fontawesome/css/fontawesome.min.css");
      require("../../assets/plugins/fontawesome/css/all.min.css");
      require("../../assets/css/font-awesome.min.css");
      require("../../assets/css/style.css");
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(api.listenToCalls(user.id));
    }
  }, [user]);

  useEffect(() => {
    if (callData?.callType === "call") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [callData]);

  const joinVoiceCall = async (channel, token, callTarget) => {
    await rtc.current.client.join(APP_ID, channel, token, user.id);
    rtc.current.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.current.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    await rtc.current.client.publish([
      rtc.current.localAudioTrack,
      rtc.current.localVideoTrack,
    ]);
    setShowModal(false);
    dispatch(api.acceptCall(callData.caller.id));
    history.push({
      pathname: "/admin/call",
      state: {
        callTarget: callTarget,
        callerId: callData.caller.id,
      },
    });
  };

  const handlesidebar = () => {
    document.body.classList.toggle('mini-sidebar');
  }

  const exclusionArray = [
    "/admin/login",
    "/admin/register",
    "/admin/forgotPassword",
    "/admin/lockscreen",
    "/admin/404",
    "/admin/500",
  ];
  if (exclusionArray.indexOf(location.pathname) >= 0) {
    return "";
  }
  return (
    <div className="header">
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <div className="call-box incoming-box">
            <div className="call-wrapper">
              <div className="call-inner">
                <div className="call-user">
                  <img alt="User" src={IMG01} className="call-avatar" />
                  <h4>
                    {callData?.caller.firstName} {callData?.caller.lastName}
                  </h4>
                  <span>Connection...</span>
                </div>
                <div className="call-items">
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn call-item call-end"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <Icon>call_end</Icon>
                  </button>
                  <button
                    onClick={() =>
                      joinVoiceCall(
                        callData?.channel,
                        callData?.token,
                        callData?.caller
                      )
                    }
                    className="btn call-item call-start"
                  >
                    <i className="material-icons">call</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Logo */}
      <div className="header-left">
        <a href="/admin" className="logo">
          <img src={logo} alt="Logo" />
        </a>
        <a href="/admin" className="logo logo-small">
          <img src={logoicon} alt="Logo" width="30" height="30" />
        </a>
      </div>
      {/* /Logo */}
      <a id="toggle_btn">
        <i className="fe fe-text-align-left" />
      </a>
      <div className="top-nav-search">
        <form>
          <input type="text" className="form-control" placeholder="Recherche" />
          <button className="btn" type="submit">
            <i className="fa fa-search" />
          </button>
        </form>
      </div>
      {/* Mobile Menu Toggle */}
      <a className="mobile_btn" id="mobile_btn" onClick={handlesidebar}>
        <i className="fa fa-bars" />
      </a>
      {/* /Mobile Menu Toggle */}

      <ul className="nav user-menu">
        <li className="nav-item dropdown noti-dropdown">
          <Dropdown className="notify">
            <Dropdown.Toggle
              className="dropdown-toggle nav-link"
              id="dropdown-basic"
            >
              <i className="fe fe-bell"></i>{" "}
              <span className="badge badge-pill">3</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="notification-list">
              <Dropdown.Item href="#/action-1" className="notification-message">
                <div className="media">
                  <span className="avatar avatar-sm">
                    <img
                      className="avatar-img rounded-circle"
                      alt="User"
                      src={IMG01}
                    />
                  </span>
                  <div className="media-body">
                    <p className="noti-details">
                      <span className="noti-title">Dr. Ruby Perrin</span>{" "}
                      Schedule{" "}
                      <span className="noti-title">her appointment</span>
                    </p>
                    <p className="noti-time">
                      <span className="notification-time">4 mins ago</span>
                    </p>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <div className="media">
                  <span className="avatar avatar-sm">
                    <img
                      className="avatar-img rounded-circle"
                      alt="User"
                      src={IMG02}
                    />
                  </span>
                  <div className="media-body">
                    <p className="noti-details">
                      <span className="noti-title">Charlene Reed</span> has
                      booked her appointment to{" "}
                      <span className="noti-title">Dr. Ruby Perrin</span>
                    </p>
                    <p className="noti-time">
                      <span className="notification-time">6 mins ago</span>
                    </p>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <div className="media">
                  <span className="avatar avatar-sm">
                    <img
                      className="avatar-img rounded-circle"
                      alt="User"
                      src={IMG03}
                    />
                  </span>
                  <div className="media-body">
                    <p className="noti-details">
                      <span className="noti-title">Mr Ouédraogo</span> a envoyé
                      20 000FCFA pour sa{" "}
                      <span className="noti-title">consultation</span>
                    </p>
                    <p className="noti-time">
                      <span className="notification-time">8 mins ago</span>
                    </p>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-1"
                className="notification-message text-center"
              >
                <span className="text-center">Voir plus</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>

        <li className="nav-item dropdown has-arrow">
          <Dropdown className="user-dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <span className="user-img">
                <img
                  className="rounded-circle"
                  src={avatar}
                  width="31"
                  alt="Ryan Taylor"
                />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" className="no-padding">
                <div className="user-header">
                  <div className="avatar avatar-sm">
                    <img
                      src={avatar}
                      alt="User"
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="user-text">
                    <h6>
                      {user?.firstName} {user?.lastName}
                    </h6>
                    <p className="text-muted mb-0">Administrateur</p>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href="/admin/profile"> My Profile</Dropdown.Item>
              <Dropdown.Item href="/admin/settings">Settings</Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(api.signOut())}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};

export default Header;
