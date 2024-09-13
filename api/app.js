import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import testRoute from './routes/test.route.js';
import usersRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';

// Dynamically import dotenv to handle environment variables
(async () => {
	const dotenv = (await import('dotenv')).default;
	dotenv.config();
})();

const app = express();

// // Serve static files from the dist directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, '../client/dist')));

const allowedOrigins = [
	'http://localhost:5137', // For local development
	'https://estate.itamar.pro', // For production
];
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

app.use('/api/auth', authRoute);
app.use('/api/test', testRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

app.listen(8800, () => {
	console.log(`Server listening on port 8800`);
});
