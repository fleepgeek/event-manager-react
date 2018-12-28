import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {'Content-Type': 'application/json'}
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
})

// instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;