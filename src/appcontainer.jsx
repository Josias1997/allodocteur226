import React, { useEffect, useContext, useState } from "react";
import { Route, BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from 'common'
import { Modal } from 'react-bootstrap';

import Header from "./client/components/header.jsx";
import Footer from "./client/components/footer.jsx";
import LoginContainer from "./client/components/login/login.jsx";
import Register from "./client/components/register/register.jsx";
import ForgotPassword from "./client/components/forgot-password";
import Home from "./client/components/home/index";

//pages
import VideoCall from "./client/components/pages/videocall";
import VoiceCall from "./client/components/pages/voicecall";
import ChooseSpeciality from "./client/components/pages/searchdoctor";
import ChoosePackage from "./client/components/patients/choose-package";
import Components from "./client/components/pages/component";
import Calendar from "./client/components/pages/calender";
import Invoice from "./client/components/pages/invoices/invoices";
import InvoiceView from "./client/components/pages/invoices/view";
import DoctorProfile from "./client/components/patients/doctorprofile";
import DoctorChat from "./client/components/doctors/chat";
import PatientChat from "./client/components/patients/chat";
import MyPatient from "./client/components/doctors/mypatient";
import Booking from "./client/components/patients/booking";
import Checkout from "./client/components/patients/checkout";
import BookingSuccess from "./client/components/patients/booking-success";
import Dashboard from "./client/components/patients/dashboard";
import Profile from "./client/components/patients/dashboard/profile";
import Password from "./client/components/patients/dashboard/password";
import DoctorDashboard from "./client/components/doctors/dashboard";
import DoctorPassword from "./client/components/doctors/password";
import Appointments from "./client/components/doctors/appointments";
import PatientProfile from "./client/components/doctors/patientprofile";
import AddPescription from "./client/components/doctors/addpescription";
import ProfileSetting from "./client/components/doctors/profilesetting";
import DoctorRegister from "./client/components/doctors/register";
import Terms from "./client/components/pages/terms";
import Policy from "./client/components/pages/policy";
import Icon from '@material-ui/core/Icon';

import { IMG01 } from './client/components/patients/chat/img';
import AgoraRTC from 'agora-rtc-sdk-ng';
//pharmacy


import AppUniversal from "./admin/app-universal";
import BlankPage from "./client/components/pages/blankpage/index.jsx";

const APP_ID = '37212e289fbf430fa31866c8b6af8559';
import { useRTC } from "./rtccontext";

const AppContainer = function (props) {
  if (props) {
    const url = props.location.pathname.split("/")[1];
    const { api } = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const callData = useSelector(state => state.call.callData);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const rtc = useRTC();

    useEffect(() => {
      if (user) {
        dispatch(api.listenToCalls(user.id));
      }
    }, [user]);

    useEffect(() => {
      console.log("callData", callData);
      if (callData?.callType === "voice-call") {
        setShowModal(true)
      } else {
        setShowModal(false);
      }
    }, [callData]);

    const joinVoiceCall = async (channel, token, callTarget) => {
      rtc.current.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      await rtc.current.client.join(APP_ID, channel, token, user.id);
      rtc.current.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await rtc.current.client.publish([rtc.current.localAudioTrack]);
      setShowModal(false);
      history.push({
        pathname: '/chat/voice-call',
        state: { 
          callTarget: callTarget, 
        }
      })
    };

    return (
      <Router>
        {url === "admin" ? (
          <div>
            <Switch>
              <Route path="/admin" component={AppUniversal} />
            </Switch>
          </div>
        ) :
        (
          <div>
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
            <Route render={(props) => <Header {...props} />} />
            <Switch>
              <Route path="/chat/video-call" exact component={VideoCall} />
              <Route path="/chat/voice-call" exact component={VoiceCall} />
              <Route path="/doctor/chat-doctor" exact component={DoctorChat} />

              <Route path="/login" exact component={LoginContainer} />
              <Route path="/register" exact component={Register} />
              <Route path="/forgot-password" exact component={ForgotPassword} />
              <Route path="(/|/home)" exact component={Home} />
              {/* pages */}

              <Route
                path="/patient/choose-speciality/:bookingType"
                exact
                component={ChooseSpeciality}
              />
              <Route
                path="/patient/choose-package"
                exact
                component={ChoosePackage}
              />
              <Route path="/pages/component" exact component={Components} />
              <Route path="/pages/blank-page" exact component={BlankPage} />
              <Route path="/pages/calendar" exact component={Calendar} />
              <Route path="/pages/invoice" exact component={Invoice} />
              <Route path="/pages/invoice-view" exact component={InvoiceView} />
              <Route
                path="/patient/doctor-profile"
                exact
                component={DoctorProfile}
              />
              <Route path="/patient/booking/" exact component={Booking} />
              <Route
                path="/patient/patient-chat"
                exact
                component={PatientChat}
              />
              <Route path="/patient/checkout" exact component={Checkout} />
              <Route
                path="/patient/booking-success"
                exact
                component={BookingSuccess}
              />
              <Route path="/patient/dashboard" exact component={Dashboard} />
              <Route path="/patient/profile" exact component={Profile} />
              <Route
                path="/patient/change-password"
                exact
                component={Password}
              />
              <Route
                path="/doctor/patients"
                exact
                component={MyPatient}
              />
              <Route
                path="/doctor/doctor-dashboard"
                exact
                component={DoctorDashboard}
              />
              <Route
                path="/doctor-change-passwword"
                exact
                component={DoctorPassword}
              />
              {/* <Route path="/chat-doctor" exact component={DoctorChat} /> */}
              <Route
                path="/doctor/appointments"
                exact
                component={Appointments}
              />
              <Route
                path="/doctor/patient-profile"
                exact
                component={PatientProfile}
              />
              <Route
                path="/doctor/add-prescription"
                exact
                component={AddPescription}
              />
              <Route
                path="/doctor/profile-setting"
                exact
                component={ProfileSetting}
              />
              <Route
                path="/doctor/doctor-register"
                exact
                component={DoctorRegister}
              />
              <Route path="/terms" exact component={Terms} />
              <Route path="/privacy-policy" exact component={Policy} />
            </Switch>
            <Route render={(props) => <Footer {...props} />} />
          </div>
        )}
      </Router>
    );
  }
  return null;
};

export default AppContainer;
