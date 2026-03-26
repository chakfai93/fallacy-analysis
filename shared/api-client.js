// api-client.js

import axios from 'axios';

class ApiClient {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL: baseURL,
        });
    }

    async get(endpoint) {
        try {
            const response = await this.client.get(endpoint);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async post(endpoint, data) {
        try {
            const response = await this.client.post(endpoint, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error(`Error: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
            // No response was received
            console.error('Error: No response from server');
        } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
        }
    }
}

export default ApiClient;
