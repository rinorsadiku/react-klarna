import axios from 'axios';

// configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_KLARNA_BASEURL;
axios.defaults.config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export default axios;
