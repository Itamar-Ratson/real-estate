import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import testRoute from './routes/test.route.js';
import usersRoute from './routes/user.route.js';

const app = express();
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/test', testRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postRoute);

app.listen(8800, () => {
	console.log('Server listening on port 8800');
});
