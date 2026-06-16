import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',

    timeout: 15000,

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.error
            || error.message
            || 'Unknown error';

        console.error("API error: ", message);
        
        return Promise.reject(message);
    }
);

export default apiClient;