// lib/api.js
import axios from 'axios';
const url = 'https://tradeet-api.onrender.com'; 
// const url = 'http://192.168.83.140:5000';

export const getStoreData = async (storeLink) => {
	try {
		console.log(
			`Fetching data for storeLink: ${storeLink}`,
		);

		// For example, fetching data from a database or an API
		const response = await axios.get(
			`${url}/businesses/store/${storeLink}`,
		);
		// console.log('Response:', response);

		if (response.status !== 200) {
			console.error(
				`Error: Received status code ${response.status}`,
			);
			return null;
		}

		const storeData = response.data.business;
		return storeData;
	} catch (error) {
		console.error('Error fetching store data:', error);
		return null;
	}
};

export const getStoreProductsData = async (storeData) => {
	try {
		const productsResponse = await axios.get(
			`${url}/businesses/products/${storeData?._id}`,
		);

		// console.log(productsResponse);
		if (productsResponse.data.success !== true) {
			console.error(
				`Error: Received status code ${productsResponse.status}`,
			);
			return [];
		}

		// console.log(productsResponse.products);

		let productsData = productsResponse.data.products;

		return { productsData };
	} catch (error) {
		console.error(
			'Error fetching store products data:',
			error,
		);
		return null;
	}
};

export const getStoreProduct = async (id) => {
	try {
		const response = await axios.get(
			`${url}/products/${id}`,
		);

		if (response.status !== 200) {
			console.error(
				`Error: Received status code ${response.status}`,
			);
			return null;
		}

		const productData = response.data;
		return productData;
	} catch (error) {
		console.error('Error fetching product data:', error);
		return null;
	}
};

export const getStoreCategoryProduct = async (id, slug) => {
	try {
		const response = await axios.get(
			`${url}/products/store/${id}/categories/${slug}/products`,
		);

		if (response.status !== 200) {
			console.error(
				`Error: Received status code ${response.status}`,
			);
			return null;
		}

		const productData = response.data;
		return productData;
	} catch (error) {
		console.error('Error fetching product data:', error);
		return null;
	}
};
