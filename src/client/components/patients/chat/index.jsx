import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from 'common';
import moment from 'moment';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';
import AgoraRTC from 'agora-rtc-sdk-ng';

import { IMG01, IMG02 } from './img';
import { useRTC } from '../../../../rtccontext';

const TOKEN_URL = 'https://agora-server-token.herokuapp.com/access_token';
const APP_ID = '37212e289fbf430fa31866c8b6af8559';

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
}

const PatientChat = () => {
	const { api } = useContext(FirebaseContext);
	const dispatch = useDispatch();
	const chats = useSelector(state => state.patientdata.chats);
	const doctors = useSelector(state => state.admin.doctors);
	const chatMessages = useSelector(state => state.chatdata.chatMessages);
	const user = useSelector(state => state.auth.user);
	const [activeModal, setActiveModal] = useState(null);
	const [searchInput, setSearchInput] = useState('');
	const [messageInput, setMessageInput] = useState('');
	const [currentDoctors, setCurrentDoctors] = useState(doctors);
	const [currentChat, setCurrentChat] = useState();
	const history = useHistory();
	const query = useQuery();
	const rtc = useRTC();

	useEffect(() => {
		dispatch(api.fetchUsers("doctor"));
		document.body.classList.add('chat-page');
		return () => {
			document.body.classList.remove('chat-page');
		}
	}, [])

	useEffect(() => {
		if (user) {
			dispatch(api.fetchPatientChats(user.id));
		}
	}, [user])

	useEffect(() => {
		if (chats.length > 0) {
			const doctor = query.get("doctor");
			if (doctor) {
				const filteredChat = chats.filter(chat => chat.doctor.id === doctor);
				if (filteredChat.length > 0) {
					setCurrentChat(filteredChat[0]);
				}
			} else {
				setCurrentChat(chats[0]);
			}
		}
	}, [chats]);

	useEffect(() => {
		if (currentChat) {
			dispatch(api.fetchChatMessages(currentChat.id));
		}
	}, [currentChat])

	const fetchToken = async () => {
		if (currentChat) {
			const response = await fetch(`${TOKEN_URL}?channel=${currentChat.id}`);
			if (!response.ok) {
				const message = `Impossible de démarrer l'appel: ${response.status}`;
				throw new Error(message);
			}
			const data = await response.json();
			return data;
		}
	}

	const leaveCall = async () => {
		dispatch(api.endCall(currentChat.doctor.id, user.id));
		if (rtc.current.localAudioTrack) {
			rtc.current.localAudioTrack.close();
		}
		if (rtc.current.client) {
			await rtc.current.client.leave();
		}
		setActiveModal(false);
	} 

	const startVoiceCall = () => {
		setActiveModal(true);
		fetchToken().then(({ token }) => {
			rtc.current.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
			rtc.current.client.on("user-published", async (user, mediaType) => {
				await rtc.current.client.subscribe(user, mediaType);
				console.log("user published");
				if (mediaType === 'audio') {
					const remoteAudioTrack = user.audioTrack;
					remoteAudioTrack.play();
				}

				rtc.current.client.on("user-unpublished", async user => {
					await rtc.current.client.unsubscribe(user);
				});

				await rtc.current.client.join(APP_ID, currentChat.id, token, user.id);
				rtc.current.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
				await rtc.current.client.publish([rtc.current.localAudioTrack]);
				setActiveModal(false);
				history.push({
					pathname: '/chat/voice-call',
					state: { 
						callTarget: currentChat.doctor, 
					}
				})
			})
			dispatch(api.startCall(currentChat.doctor.id, token, currentChat.id, {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName
			}, "voice-call"));
		}).catch(error => {
			alert(error.message);
		}) 
	}

	const startVideoCall = () => {
		fetchToken().then(({ token }) => {
			
		}).catch(error => {
			alert(error.message);
		})
	}

	const openModal= (id)=> {
       	setActiveModal(id);
	}
	  
    const handleCloseModal = () => {
      	setActiveModal(false); 
	}

	const handleSearchInputChange = event => {
		let value = event.target.value;
		setSearchInput(value);
		const searchResults = currentDoctors.filter(doctor => 
			(doctor.firstName + ' ' + doctor.lastName).toLowerCase().includes(value.toLowerCase()));
		setCurrentDoctors(searchResults);
	}

	const createChat = doctor => {
		dispatch(api.createChat({
			doctor: doctor,
			patient: user,
			unreadMessages: 0,
			lastMessage: {
				type: "text",
				text: "Nouvelle discussion",
				date: moment().format("LL")
			}
		}))
	}

	const sendMessage = () => {
		const date = moment().format("LT");
		dispatch(api.sendMessage(currentChat.id, {
			text: messageInput,
			type: "text",
			user: user,
			date: date
		}))
		dispatch(api.updateChat(currentChat.id, {
			lastMessage: {
				type: "text",
				text: messageInput,
				date: date
			},
			unreadMessages: currentChat.unreadMessages + 1
		}))
		setMessageInput('');
	}

	const handleKeyPress = event => {
		if (messageInput.trim()) {
			if (event.charCode === 13) {
				sendMessage();
			}
		}
	}

	return(
    <div>
        <div className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-xl-12">
							<div className="chat-window">
							
								
								<div className="chat-cont-left">
									<div className="chat-header">
										<span>Chats</span>
										<a href="#0" className="chat-compose">
											<i className="material-icons">control_point</i>
										</a>
									</div>
									<form className="chat-search">
										<div className="input-group">
											<div className="input-group-prepend">
												<i className="fas fa-search"></i>
											</div>
											<input 
												onChange={handleSearchInputChange} 
												type="text" className="form-control" 
												placeholder="Recherche"
											/>
										</div>
									</form>
									<div className="chat-users-list">
										<div className="chat-scroll">
										{chats.length === 0 ? currentDoctors.map(doctor => 
											<a 
												href="#0" 
												className="media" 
												key={doctor.id} 
												onClick={() => createChat(doctor)}>
											<div className="media-img-wrap">
												<div className="avatar avatar-away">
													<img src={IMG01} alt="User" className="avatar-img rounded-circle" />
												</div>
											</div>
											<div className="media-body">
												<div>
													<div className="user-name">{doctor.firstName} {doctor.lastName}</div>
													<div className="user-last-chat">
														Cliquer pour commencer une discussion 
													</div>
												</div>
												<div>
													<div className="last-chat-time block"></div>
													<div className="badge badge-success badge-pill"></div>
												</div>
											</div>
											</a>) :
											chats.map(chat => <a href="#0" className="media" key={chat.id}>
												<div className="media-img-wrap">
													<div className="avatar avatar-away">
														<img src={IMG01} alt="User" className="avatar-img rounded-circle" />
													</div>
												</div>
												<div className="media-body">
													<div>
														<div className="user-name">
															{chat.doctor.firstName + ' ' + chat.doctor.lastName}
														</div>
														<div className="user-last-chat">
															{chat.lastMessage.type === "text" ? chat.lastMessage.text : "Nouvelle Image"} 
														</div>
													</div>
													<div>
														<div className="last-chat-time block">{chat.lastMessage.date}</div>
														<div className="badge badge-success badge-pill">{chat.unreadMessages}</div>
													</div>
												</div>
											</a>)
										}
										</div>
									</div>
								</div>
								{currentChat && 								
								<div className="chat-cont-right">
									<div className="chat-header">
										<a id="back_user_list" href="#0" className="back-user-list">
											<i className="material-icons">chevron_left</i>
										</a>
										<div className="media">
											<div className="media-img-wrap">
												<div className="avatar avatar-online">
								 					<img src={IMG01} alt="User" className="avatar-img rounded-circle" />
												</div>
											</div>
											<div className="media-body">
												<div className="user-name">
													{currentChat.doctor.firstName} {currentChat.doctor.lastName}
												</div>
												<div className="user-status">online</div>
											</div>
										</div>
										<div className="chat-options">
											<button className="btn call-item" data-toggle="modal" data-target="#voice_call" onClick={startVoiceCall}>
												<i className="material-icons">local_phone</i> 
											</button>
											<button className="btn call-item" data-toggle="modal" data-target="#video_call" onClick={startVideoCall}>
												<i className="material-icons">videocam</i>
											</button>
											<button className="btn call-item">
												<i className="material-icons">more_vert</i>
											</button>
										</div>
									</div>
									<div className="chat-body">
										<div className="chat-scroll">
											<ul className="list-unstyled">
												{chatMessages.map(message => (
												<li key={message.id} 
													className={`media ${message.user.id === user.id ? "sent" : "received"}`}>
													<div className="avatar">
														<img src={IMG02} alt="User" className="avatar-img rounded-circle" />
													</div>
													<div className="media-body">
													{
														message.type === "text" ? 														<div className="msg-box">
															<div>
																<p>{message.text}</p>
																<ul className="chat-msg-info">
																	<li>
																		<div className="chat-time">
																			<span>{message.date}</span>
																		</div>
																	</li>
																</ul>
															</div>
														</div> : 
															<div className="msg-box">
																<div>
																	<div className="chat-msg-attachments">
																		<div className="chat-attachment">
																			<img src={IMG010} alt="Attachment" />
																			<div className="chat-attach-caption">placeholder.jpg</div>
																			<a href="#0" className="chat-attach-download">
																				<i className="fas fa-download"></i>
																			</a>
																		</div>
																	</div>
																	<ul className="chat-msg-info">
																		<li>
																			<div className="chat-time">
																				<span>8:41 AM</span>
																			</div>
																		</li>
																	</ul>
																</div>
															</div>
													}
													</div>
												</li>
												))}
											</ul>
										</div>
									</div>
									<div className="chat-footer">
										<div className="input-group">
											<div className="input-group-prepend">
												<div className="btn-file btn">
													<i className="fa fa-paperclip"></i>
													<input type="file" />
												</div>
											</div>
											<input 
												type="text" 
												onChange={event => setMessageInput(event.target.value)} 
												value={messageInput}
												className="input-msg-send form-control"
												onKeyPress={handleKeyPress}
												placeholder="Message"/>
											<div className="input-group-append">
												<button 
													type="button" 
													className="btn msg-send-btn"
													onClick={sendMessage}
												>
													<i className="fab fa-telegram-plane"></i>
												</button>
											</div>
										</div>
									</div>
								</div>}
								
							</div>
						</div>
					</div>
				
				</div>

			</div>		
			<Modal show={activeModal} onHide={handleCloseModal} centered>
				<Modal.Body>	
					<div className="call-box incoming-box">
						<div className="call-wrapper">
							<div className="call-inner">
								<div className="call-user">
									<img alt="User" src={IMG01} className="call-avatar" />
									<h4>{currentChat?.doctor.firstName} {currentChat?.doctor.lastName}</h4>
									<span>Connection...</span>
								</div>							
								<div className="call-items">
									<button onClick={leaveCall} className="btn call-item call-end" data-dismiss="modal" aria-label="Close">
										<Icon>call_end</Icon>
									</button>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
    );
}
export default PatientChat;      