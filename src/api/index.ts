import axios from 'axios';

const repoAdoptToken = localStorage.getItem('repoAdoptToken') ?? false;

const api = axios.create({
	baseURL: 'http://localhost:5001/',
	headers: {
		Authorization: "Bearer " + repoAdoptToken
	}
});

export default api;
