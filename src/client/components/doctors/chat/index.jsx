import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from 'common';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';
import { IMG01, IMG02 } from './img';

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
}

const DoctorChat = () => {
	const { api } = useContext(FirebaseContext);
	const dispatch = useDispatch();
	const chats = useSelector(state => state.doctordata.chats);
	const patients = useSelector(state => state.admin.patients);
	const chatMessages = useSelector(state => state.chatdata.chatMessages);
	const user = useSelector(state => state.auth.user);
	const [activeModal, setActiveModal] = useState(null);
	const [searchInput, setSearchInput] = useState('');
	const [messageInput, setMessageInput] = useState('');
	const [currentPatients, setCurrentPatients] = useState(patients);
	const [currentChat, setCurrentChat] = useState();
	const query = useQuery();

	useEffect(() => {
		dispatch(api.fetchUsers("patient"));
		document.body.classList.add('chat-page');
		return () => {
			document.body.classList.remove('chat-page');
		}
	}, [])

	useEffect(() => {
		if (user) {
			dispatch(api.fetchDoctorChats(user.id));
		}
	}, [user])

	useEffect(() => {
		if (chats.length > 0) {
			const patient = query.get("patient");
			if (patient) {
				const filteredChat = chats.filter(chat => chat.patient.id === patient);
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

	const openModal= (id)=> {
       	setActiveModal(id);
	}
	  
    const handleCloseModal = () => {
      	setActiveModal(false); 
	}

	const handleSearchInputChange = event => {
		let value = event.target.value;
		setSearchInput(value);
		const searchResults = currentPatients.filter(patient => 
			(patient.firstName + ' ' + patient.lastName).toLowerCase().includes(value.toLowerCase()));
		setCurrentPatients(searchResults);
	}

	const createChat = patient => {
		dispatch(api.createChat({
			patient: patient,
			doctor: user,
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
										{chats.length === 0 ? currentPatients.map(patient => 
											<a 
												href="#0" 
												className="media" 
												key={patient.id} 
												onClick={() => createChat(patient)}>
											<div className="media-img-wrap">
												<div className="avatar avatar-away">
													<img src={IMG01} alt="User" className="avatar-img rounded-circle" />
												</div>
											</div>
											<div className="media-body">
												<div>
													<div className="user-firstName">{patient.firstName} {patient.lastName}</div>
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
														<div className="user-firstName">
															{chat.patient.firstName + ' ' + chat.patient.lastName}
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
												<div className="user-firstName">{currentChat.patient.firstName} {currentChat.patient.lastName}</div>
												<div className="user-status">online</div>
											</div>
										</div>
										<div className="chat-options">
											<a href="#0" data-toggle="modal" data-target="#voice_call" onClick={() => openModal('voice')}>
												<i className="material-icons">local_phone</i> 
											</a>
											<a href="#0" data-toggle="modal" data-target="#video_call" onClick={() => openModal('video')}>
												<i className="material-icons">videocam</i>
											</a>
											<a href="#0">
												<i className="material-icons">more_vert</i>
											</a>
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
				{/* modal for video*/}
                <Modal show={activeModal === 'video'} onHide={handleCloseModal} centered>
					<Modal.Body>	
						<div className="call-box incoming-box">
							<div className="call-wrapper">
								<div className="call-inner">
									<div className="call-user">
										<img alt="User" src={IMG01} className="call-avatar" />
										<h4>{currentChat?.patient.firstName} {currentChat?.patient.lastName}</h4>
										<span>Connection...</span>
									</div>							
									<div className="call-items">
										<a href="#0" className="btn call-item call-end" data-dismiss="modal" aria-label="Close">
										<Icon>call_end</Icon>
										</a>
										<Link to="/voice-call" className="btn call-item call-start"><i className="material-icons">call</i></Link>
									</div>
								</div>
							</div>
						</div>
						</Modal.Body>
				</Modal>
				{/* modal for call*/}
				<Modal show={activeModal === 'voice'} onHide={handleCloseModal} centered>
					<Modal.Body>	
						<div className="call-box incoming-box">
							<div className="call-wrapper">
								<div className="call-inner">
									<div className="call-user">
										<img alt="User" src={IMG01} className="call-avatar" />
										<h4>{currentChat?.patient.firstName} {currentChat?.patient.lastName}</h4>
										<span>Connecting...</span>
									</div>							
									<div className="call-items">
										<a href="#0" className="btn call-item call-end" data-dismiss="modal" aria-label="Close">
										<Icon>call_end</Icon>
										</a>
										<Link to="/voice-call" className="btn call-item call-start"><i className="material-icons">call</i></Link>
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			
		</div>

    );
}
export default DoctorChat;      