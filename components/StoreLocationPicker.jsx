import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreLocationPicker = ({
	store,
	setDeliveryFee,
	setLandmark,
}) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [selectedLocation, setSelectedLocation] =
		useState(null);
	const [address, setAddress] = useState('');

	const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Replace with your actual key

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setSelectedLocation({ latitude, longitude });
					reverseGeocode(latitude, longitude);
				},
				(error) => {
					alert('Location error: ' + error.message);
				},
			);
		}
	}, []);

	const reverseGeocode = async (lat, lng) => {
		try {
			const res = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
			);
			if (res.data.results.length > 0) {
				setAddress(res.data.results[0].formatted_address);
			}
		} catch (err) {
			console.error('Reverse geocoding failed:', err);
		}
	};

	const handleSearch = async (query) => {
		setSearchQuery(query);
		console.log(query)
		if (query.length > 2) {
			try {
				const res = await axios.get(
					`https://maps.googleapis.com/maps/api/place/autocomplete/json`,
					{
						params: {
							input: query,
							key: GOOGLE_API_KEY,
							types: 'geocode',
							language: 'en',
						},
					},
				);
				setSuggestions(res.data.predictions);
			} catch (err) {
				console.error('Autocomplete error:', err);
			}
		} else {
			setSuggestions([]);
		}
	};

	const getPlaceDetails = async (placeId) => {
		const res = await axios.get(
			`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`,
		);
		return res.data.result.geometry.location;
	};

	const haversineDistance = (lat1, lon1, lat2, lon2) => {
		const toRadians = (degrees) =>
			(degrees * Math.PI) / 180;
		const R = 6371;
		const dLat = toRadians(lat2 - lat1);
		const dLon = toRadians(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) ** 2 +
			Math.cos(toRadians(lat1)) *
				Math.cos(toRadians(lat2)) *
				Math.sin(dLon / 2) ** 2;
		const c =
			2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c;
	};

	const calculateDeliveryCharge = (
		storeLat,
		storeLon,
		userLat,
		userLon,
	) => {
		const distance = haversineDistance(
			storeLat,
			storeLon,
			userLat,
			userLon,
		);
		return Math.min(
			400 +
				Math.max(0, Math.ceil((distance - 2) / 2) * 400),
			1000000,
		);
	};

	const handleSelectSuggestion = async (suggestion) => {
		try {
			const location = await getPlaceDetails(
				suggestion.place_id,
			);
			setSelectedLocation({
				latitude: location.lat,
				longitude: location.lng,
			});
			const storeLocation = {
				latitude: store?.location?.coordinates[1],
				longitude: store?.location?.coordinates[0],
			};
			const deliveryCharge = calculateDeliveryCharge(
				storeLocation.latitude,
				storeLocation.longitude,
				location.lat,
				location.lng,
			);
			setDeliveryFee(deliveryCharge);
			setAddress(suggestion.description);
			setLandmark(suggestion.description);
			setSearchQuery(suggestion.description);
			setSuggestions([]);
		} catch (err) {
			console.error('Error selecting suggestion:', err);
		}
	};

	return (
		<div className="container">
			<h2 className="block mb-1 text-sm">
				Address*
			</h2>
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => handleSearch(e.target.value)}
				placeholder="E.g Multipurpose hall, Yabatech..."
				className="w-full p-2 text-sm border rounded-lg"
			/>
			{suggestions.length > 0 && (
				<ul>
					{suggestions.map((item) => (
						<li
							key={item.place_id}
							onClick={() => handleSelectSuggestion(item)}
							className="my-3 cursor-pointer pb-2 border-b border-gray-300"
						>
							{item.description}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default StoreLocationPicker;
