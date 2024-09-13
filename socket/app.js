import { Server } from 'socket.io';

const io = new Server({
	cors: {
		origin: 'https://estate.itamar.pro',
		methods: ['GET', 'POST'],
		credentials: true,
	},
	transports: ['websocket', 'polling'],
});

let onlineUser = [];

const addUser = (userId, socketId) => {
	const userExists = onlineUser.find((user) => user.userId === userId);
	if (!userExists) {
		onlineUser.push({ userId, socketId });
	}
};
const removeUser = (socketId) => {
	onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
	return onlineUser.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
	socket.on('newUser', (userId) => {
		addUser(userId, socket.id);
	});

	socket.on('sendMessage', ({ recieverId, data }) => {
		const reciever = getUser(recieverId);
		io.to(reciever.socketId).emit('getMessage', data);
	});

	socket.on('disconnect', () => {
		removeUser(socket.id);
	});
});

io.listen('4001');
console.log('Socket.io server is listening on port 4001');
