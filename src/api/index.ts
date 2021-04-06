import axios from 'axios';



const api = axios.create({
	baseURL: 'http://localhost:5001/',
});

axios.interceptors.request.use(
	config => {
		if (!config.headers.Authorization) {
			const repoAdoptToken = localStorage.getItem('repoAdoptToken') ?? false;
			if(repoAdoptToken){
				config.headers.common['Authorization'] = repoAdoptToken;
			}
		}
		return config
	},
	error => Promise.reject(error)
)

export default api;
