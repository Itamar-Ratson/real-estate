import axios from 'axios';

const apiRequest = axios.create({
	baseURL: 'https://estate.itamar.pro:8800/api',
	withCredentials: true,
});

export default apiRequest;
