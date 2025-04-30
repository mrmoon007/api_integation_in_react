import axios from "axios";



const ApiService = {
    init() {
        axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
        // axios.defaults.withCredentials = true;
        // axios.defaults.baseURL = import.meta.env.VITE_API_URL;
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('accessToken')}`;
    },

    get(resource, params) {
        // console.log(localStorage.getItem('accessToken'));
        
        return axios.get(`${resource}`, params);
    },

    post(resource, params) {
        console.log(localStorage.getItem('accessToken'));
        return axios.post(`${resource}`, params);
    },

    update(resource, params) {
        return axios.put(`${resource}`, params);
    },

    delete(resource, params) {
        return axios.delete(resource);
    },
}

export default ApiService;