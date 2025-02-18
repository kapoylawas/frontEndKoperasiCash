import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL =
    import.meta.env.MODE === 'development' ?
    import.meta.env.VITE_APP_BASEURL :
    import.meta.env.VITE_APP_BASEURL_PRODUCTION;

const Api = axios.create({
    baseURL: baseURL
});

// Handle unauthenticated
Api.interceptors.response.use(function(response) {
    return response;
}, (error) => {
    if (401 === error.response.status) {
        Cookies.remove('token');
        window.location = '/';
    } else {
        return Promise.reject(error);
    }
});

export default Api;