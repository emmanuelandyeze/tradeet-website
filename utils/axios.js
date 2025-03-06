// utils/axios.js

import axios from 'axios';

const axiosClient = axios.create({
	baseURL: 'http://192.168.136.140:5000', // Example base URL, replace with your API URL
	// timeout: 5000, // Timeout in milliseconds
	// 'https://tradeet-api.vercel.app'
	// http://localhost:9000
	headers: {
		'Content-Type': 'application/json',
		// Add any headers you need for every request (e.g., Authorization token)
	},
});

export default axiosClient;
