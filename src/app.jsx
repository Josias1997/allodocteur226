import React, { useContext, useEffect, useState, useRef, createContext } from "react";
import { FirebaseContext } from "common";
import { useDispatch, useSelector } from "react-redux";
import { Route } from 'react-router-dom';

import { RTCContext, RemoteVideoTrackContext } from './rtccontext';

import AppContainer from "./appcontainer";

const App = (props) => {
	const { api } = useContext(FirebaseContext);
	const loadingUser = useSelector(state => state.auth.loadingUser);
	const dispatch = useDispatch();
	const rtc = useRef({
		client: null,
		localAudioTrack: null,
		localVideoTrack: null
	});
	const [remoteVideoTrack, setRemoteVideoTrack] = useState(null);
 
	useEffect(() => {
		dispatch(api.isUserLoggedIn());
	}, []);

    return(loadingUser ? <div className="d-flex align-items-center justify-content-center col-md-12">Chargement ...</div> :
    	<RTCContext.Provider value={rtc}>
    		<RemoteVideoTrackContext.Provider value={{ remoteVideoTrack, setRemoteVideoTrack }}>
    			<Route render={(props)=> <AppContainer {...props}/>} />
    		</RemoteVideoTrackContext.Provider>
    	</RTCContext.Provider>
    );

}


export default App;
