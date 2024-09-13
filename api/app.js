import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import testRoute from './routes/test.route.js';
import usersRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';

const allowedOrigins = [
	'http://localhost:3000', // For local development
	'https://estate.itamar.pro', // For production
];

const app = express();
app.use(
	cors({
		origin: function (origin, callback) {
			if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'client/dist')));

app.use('/api/auth', authRoute);
app.use('/api/test', testRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

// Handle fallback for client-side routing
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.listen(8800, () => {
	console.log(`Server listening on port 8800`);
});
