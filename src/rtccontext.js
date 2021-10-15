import { createContext, useContext } from 'react';

export const RTCContext = createContext();

export const useRTC = () => {
	return useContext(RTCContext);
};