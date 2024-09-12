import axios from 'axios';

const apiRequest = axios.create({
	baseURL: '/api:8800/api',
	withCredentials: true,
});

export default apiRequest;
