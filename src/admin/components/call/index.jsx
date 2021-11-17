import React, { useEffect, useContext, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { FirebaseContext } from 'common';
import { AgoraVideoPlayer } from 'agora-rtc-react';

import { IMG02 } from "./img";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useRTC, useRemoteVideoTrack } from '../../../rtccontext';

const VideoCall = () => {
    const { api } = useContext(FirebaseContext);
    const user = useSelector(state => state.auth.user);
    const callAccepted = useSelector(state => state.call.callAccepted);
    const callData = useSelector(state => state.call.callData);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const { state } = location;
    const rtc = useRTC();
    const { remoteVideoTrack } = useRemoteVideoTrack();
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);

    useEffect(() => {
        if ((user.id === state.callerId && !callAccepted) || (user.id !== state.callerId && !callData)) {
            alert("Appel terminé");
            leaveCall();
        }
    }, [callAccepted, callData]);

    useEffect(() => {
    }, [remoteVideoTrack]);

    const leaveCall = async () => {
        dispatch(api.endCall(state.callTarget?.id, state.callerId));
        if (rtc.current.localAudioTrack) {
            rtc.current.localAudioTrack.close();
        }
        if (rtc.current.localVideoTrack) {
          rtc.current.localVideoTrack.close();
        }
        if (rtc.current.client) {
            await rtc.current.client.leave();
        }
        history.goBack();
    };

    const toggleVideo = () => {
      rtc.current.localVideoTrack.setEnabled(!rtc.current.localVideoTrack.enabled)
      .then(() => {
          setVideoEnabled(rtc.current.localVideoTrack.enabled)
      });
    };

    const toggleAudio = () => {
      rtc.current.localAudioTrack.setEnabled(!rtc.current.localAudioTrack.enabled)
      .then(() => {
        setAudioEnabled(enabled => !enabled);
      });
    };
    
    return (
      <>
        <div className="content">
          <div className="container-fluid">
            <div className="call-wrapper">
              <div className="call-main-row">
                <div className="call-main-wrapper">
                  <div className="call-view">
                    <div className="call-window">
                      <div className="fixed-header">
                        <div className="navbar">
                          <div className="user-details">
                            <div className="float-left user-img">
                              <a
                                className="avatar avatar-sm mr-2"
                                href="/doctor/patient-profile"
                                title="Charlene Reed"
                              >
                                <img
                                  src={IMG02}
                                  alt="User"
                                  className="rounded-circle"
                                />
                                <span className="status online"></span>
                              </a>
                            </div>
                            <div className="user-info float-left">
                              <a href="/doctor/patient-profile">
                                <span>Charlene Reed</span>
                              </a>
                              <span className="last-seen">En ligne</span>
                            </div>
                          </div>
                          <ul className="nav float-right custom-menu">
                            <li className="nav-item dropdown dropdown-action">
                              <a
                                href="#0"
                                className="nav-link dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fa fa-cog"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a href="#0" className="dropdown-item">
                                  Paramètres
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="call-contents">
                        <div className="call-content-wrap">
                          {remoteVideoTrack && 
                            <AgoraVideoPlayer 
                              className="user-video" 
                              videoTrack={remoteVideoTrack} 
                            />}
                          {rtc.current.localVideoTrack && 
                            <AgoraVideoPlayer 
                              className="my-video" 
                              videoTrack={rtc.current.localVideoTrack} 
                            />}
                        </div>
                      </div>
                      <div className="call-footer">
                        <div className="call-icons">
                          <span className="call-duration">00:59</span>
                          <ul className="call-items">
                            <li className="call-item">
                              <OverlayTrigger
                                overlay={
                                  <Tooltip id="tooltip1">Activer la vidéo</Tooltip>
                                }
                              >
                                <button className="d-inline-block" onClick={toggleVideo}>
                                    <i className={videoEnabled ? "fas fa-video" : "fa fa-video-slash"}></i>
                                </button>
                              </OverlayTrigger>
                            </li>
                            <li className="call-item">
                              <OverlayTrigger
                                overlay={<Tooltip id="tooltip2">Mute</Tooltip>}
                              >
                                <button className="d-inline-block" onClick={toggleAudio}>
                                    <i className={audioEnabled ? 
                                      "fa fa-microphone" : "fa fa-microphone-slash"}></i>
                                </button>
                              </OverlayTrigger>
                            </li>
                          </ul>
                          <div className="end-call">
                            <button onClick={leaveCall}>
                              <i className="material-icons">call_end</i>
                            </button>
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
      </>
    );
}

export default VideoCall;
