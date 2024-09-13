import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();
export const SocketContextProvider = ({ children }) => {
	const { currentUser } = useContext(AuthContext);
	const [socket, setsocket] = useState(null);

	useEffect(() => {
		setsocket(
			io('https://estate.itamar.pro', {
				transports: ['websocket', 'polling'],
			})
		);
	}, []);

	useEffect(() => {
		currentUser && socket?.emit('newUser', currentUser.id);
	}, [currentUser, socket]);

	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
