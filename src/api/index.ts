import axios from 'axios';



const api = axios.create({
	baseURL: 'http://localhost:5001/',
});

const repoAdoptToken = localStorage.getItem('repoAdoptToken') ?? false;
if(repoAdoptToken){
	api.defaults.headers.common['Authorization'] = repoAdoptToken;
}

export default api;
