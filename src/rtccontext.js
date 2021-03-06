import { createContext, useContext } from 'react';

export const RTCContext = createContext();
export const RemoteVideoTrackContext = createContext();

export const useRTC = () => {
	return useContext(RTCContext);
};

export const useRemoteVideoTrack = () => {
	return useContext(RemoteVideoTrackContext);
};