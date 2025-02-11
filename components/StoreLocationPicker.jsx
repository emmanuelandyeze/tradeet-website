import React, {
	useState,
	useEffect,
	useContext,
} from 'react';
import awsLocation from '@/utils/aws-config';
import axios from 'axios';
// import { AuthContext } from '@/context/AuthContext';

const StoreLocationPicker = ({store, setDeliveryFee, setLandmark}) => {
	// const { userInfo } = useContext(AuthContext);
	const [searchQuery, setSearchQuery] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [selectedLocation, setSelectedLocation] =
		useState(null);
	const [address, setAddress] = useState('');

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setSelectedLocation({ latitude, longitude });
					reverseGeocode(latitude, longitude);
				},
				(error) => {
					if (error.code === error.PERMISSION_DENIED) {
						alert(
							'Location access denied. Please enable location permissions in your browser settings.',
						);
					} else if (
						error.code === error.POSITION_UNAVAILABLE
					) {
						alert('Location information is unavailable.');
					} else if (error.code === error.TIMEOUT) {
						alert('Location request timed out. Try again.');
					} else {
						alert(
							'An unknown error occurred while fetching location.',
						);
					}
				},
			);
		} else {
			alert(
				'Geolocation is not supported by your browser.',
			);
		}
	}, []);


	const reverseGeocode = (lat, lng) => {
		const params = {
			IndexName: 'Tradeet',
			Position: [lng, lat],
			MaxResults: 1,
		};

		awsLocation.searchPlaceIndexForPosition(
			params,
			(err, data) => {
				if (err) {
					console.error(
						'Error with reverse geocoding:',
						err,
					);
				} else {
					if (data.Results.length > 0) {
						setAddress(data.Results[0].Place.Label);
					}
				}
			},
		);
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
		if (query.length > 2) {
			const params = {
				IndexName: 'Tradeet',
				Text: query,
				MaxResults: 3,
			};

			awsLocation.searchPlaceIndexForText(
				params,
				(err, data) => {
					if (err) {
						console.error(
							'Error fetching location suggestions:',
							err,
						);
					} else {
						setSuggestions(data.Results || []);
					}
				},
			);
		} else {
			setSuggestions([]);
		}
	};

	const haversineDistance = (lat1, lon1, lat2, lon2) => {
		const toRadians = (degrees) =>
			(degrees * Math.PI) / 180;
		const R = 6371; // Radius of Earth in km

		const dLat = toRadians(lat2 - lat1);
		const dLon = toRadians(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRadians(lat1)) *
				Math.cos(toRadians(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c =
			2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return R * c; // Distance in km
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
		// Base charge of ₦400 for 0-3 km
		const charge =
			400 +
			Math.max(0, Math.ceil((distance - 2.5) / 2.5) * 400);
		return Math.min(charge, 1000000); // Cap at ₦1,000,000
	};

	// Example Usage
	const storeLocation = {
		latitude: store.location.coordinates[1],
		longitude: store.location.coordinates[0],
	}; // Example store (Lagos)
	const userLocation = { latitude: 6.6, longitude: 3.35 }; // Example user

	

	const handleSelectSuggestion = async (suggestion) => {
		const location = await suggestion.Place.Geometry.Point;
		setSelectedLocation({
			latitude: location[1],
			longitude: location[0],
		});

		const deliveryCharge = calculateDeliveryCharge(
			storeLocation.latitude,
			storeLocation.longitude,
			location[1],
			location[0],
		);
		setDeliveryFee(deliveryCharge)
		setAddress(suggestion.Place.Label);
		setLandmark(suggestion.Place.Label);
		setSearchQuery(suggestion.Place.Label);
		setSuggestions([]);
	};

	return (
		<div className="container">
			<h2 className="block mb-1 text-sm">
				Nearest Landmark*
			</h2>
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => handleSearch(e.target.value)}
				placeholder="E.g Yabatech, Unilag, Shomolu, etc..."
				className="w-full p-2 text-sm border rounded-lg"
			/>
			{suggestions.length > 0 && (
				<ul>
					{suggestions.map((item) => (
						<li
							key={item.PlaceId}
							onClick={() => handleSelectSuggestion(item)}
						>
							{item.Place.Label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default StoreLocationPicker;
