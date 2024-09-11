import axios from 'axios';

const apiRequest = axios.create({
	baseURL: 'http://92.113.26.167:8800/api',
	withCredentials: true,
});

export default apiRequest;
