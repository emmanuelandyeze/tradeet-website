'use client';

import React, { useEffect, useState } from 'react';
import { IoMdTrash } from 'react-icons/io';
import {
	useParams,
	useRouter,
	useSearchParams,
} from 'next/navigation';
import axiosClient from '@/utils/axios';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getStoreData } from '@/app/lib/api';

const countryCodes = [{ code: '+234', country: 'Nigeria' }];

const CheckoutPage = () => {
	const searchParams = useSearchParams();
	const advId = searchParams.get('ad');
	const [cart, setCart] = useState([]);
	const [userDetails, setUserDetails] = useState({
		name: '',
		whatsapp: '',
	});
	const [serviceType, setServiceType] =
		useState('self-pickup');
	const [address, setAddress] = useState('');
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [discountCode, setDiscountCode] = useState('');
	const [discountApplied, setDiscountApplied] =
		useState(false);
	const [selectedCountryCode, setSelectedCountryCode] =
		useState(countryCodes[0].code);
	const [store, setStore] = useState(null);
	const [deliveryFee, setDeliveryFee] = useState(0);
	const [deliveryServices, setDeliveryServices] = useState(
		[],
	);
	const [selectedState, setSelectedState] = useState('');
	const [availableServices, setAvailableServices] =
		useState([]);
	const [selectedLocation, setSelectedLocation] =
		useState('');
	const [availableLocations, setAvailableLocations] =
		useState([]);
	const [loading, setLoading] = useState(false);
	const [adLoading, setAdLoading] = useState(false);
	const [serviceName, setServiceName] = useState('');

	const [discountAmount, setDiscountAmount] = useState(0);
	const [code, setCode] = useState('');
	const [discountInfo, setDiscountInfo] = useState(null);
	const [error, setError] = useState('');

	const { storeLink } = useParams();
	const router = useRouter();

	// Fetch Store and Delivery Services Data
	useEffect(() => {
		const fetchStoreData = async () => {
			try {
				const storeData = await getStoreData(storeLink);
				if (storeData) {
					setStore(storeData);

					// Fetch Delivery Services
					const deliveryResponse = await axiosClient.get(
						`/api/delivery/creator/${storeData._id}`,
					);
					if (deliveryResponse.status === 200) {
						setDeliveryServices(deliveryResponse.data);
					}
				}
			} catch (error) {
				console.error(
					'Error fetching store or delivery data:',
					error,
				);
			}
		};
		fetchStoreData();
	}, [storeLink]);

	useEffect(() => {
		if (advId) {
			// Validate and Apply Discount Code
			const handleApplyDiscount = async (code) => {
				setAdLoading(true);
				try {
					const response = await axiosClient.get(
						`/api/ads/validate/${code}`,
					);
					// console.log(code, response);
					if (response.status === 200) {
						setDiscountApplied(true);
						setDiscountCode(code);
						toast.success(
							'Discount code applied successfully',
						);
						setAdLoading(false);
					} else {
						toast.error('Invalid discount code');
						setDiscountApplied(false);
						setAdLoading(false);
					}
				} catch (error) {
					toast.error('Error validating discount code');
					console.error(error);
					setAdLoading(false);
				}
			};

			handleApplyDiscount(advId);
		} else {
			setDiscountApplied(false);
		}
	}, [advId]);

	useEffect(() => {
		const savedCart =
			JSON.parse(localStorage.getItem('cart')) || [];

		setCart(savedCart);
	}, []);

	console.log(cart);

	// Handle Input Changes
	const handleInputChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
	};

	const handleServiceChange = (e) => {
		setServiceType(e.target.value);
		if (e.target.value === 'self-pickup') {
			setDeliveryFee(0);
		}
	};

	const handleAddressChange = (e) => {
		setAddress(e.target.value);
	};

	// Handle state selection change
	const handleStateChange = (event) => {
		const state = event.target.value;
		setSelectedState(state);

		// Filter delivery services that match the selected state
		const servicesForState = deliveryServices
			.map((service) => {
				const matchingDetail = service.deliveryDetails.find(
					(detail) => detail.state === state,
				);
				return matchingDetail
					? {
							serviceName: service.serviceName,
							locations: matchingDetail.locations,
					  }
					: null;
			})
			.filter((service) => service !== null);

		console.log(servicesForState);
		if (servicesForState.length > 0) {
			// Populate available locations for the selected state
			setAvailableLocations(servicesForState[0].locations);
			setServiceName(servicesForState[0].serviceName);
		} else {
			setAvailableLocations([]);
		}
	};

	console.log(availableLocations);

	// Handle location selection change
	const handleLocationChange = (event) => {
		const location = event.target.value;
		setSelectedLocation(location);

		// Find the delivery fee for the selected location
		const selectedService = availableLocations.find(
			(loc) => loc.location === location,
		);
		if (selectedService) {
			setDeliveryFee(selectedService.fee);
		}
	};

	const validateFields = () => {
		if (!userDetails.name || !userDetails.whatsapp) {
			toast.error('Please fill in all customer details.');
			return false;
		}

		if (
			serviceType === 'delivery' &&
			(!address || !selectedState)
		) {
			toast.error(
				'Please fill in the delivery address and select a state.',
			);
			return false;
		}

		if (cart.length === 0) {
			toast.error('Your cart is empty.');
			return false;
		}

		return true;
	};

	// Calculate Total Amount
	const getTotalAmount = () => {
		return cart.reduce((total, item) => {
			// Get the base price from the variant or the product itself
			const basePrice = item?.variant
				? item?.variant?.price
				: item?.price;

			// Calculate the total price of all additions
			const additionsPrice =
				item?.additions?.reduce(
					(sum, add) => sum + (add?.price || 0),
					0,
				) || 0;

			// Calculate total for this item
			const itemTotal =
				(basePrice + additionsPrice) * item.quantity;

			// Add to the running total
			return total + itemTotal;
		}, 0);
	};

	const getSubtotal = () => {
		const totalAmount = getTotalAmount();
		const discount = discountApplied
			? totalAmount * 0.1
			: 0;
		return totalAmount - discount;
	};

	// Cart Management
	const increaseQuantity = (index) => {
		const newCart = [...cart];
		newCart[index].quantity += 1;
		setCart(newCart);
	};

	const decreaseQuantity = (index) => {
		const newCart = [...cart];
		if (newCart[index].quantity > 1) {
			newCart[index].quantity -= 1;
		} else {
			newCart.splice(index, 1);
		}
		setCart(newCart);
	};

	const removeItemFromCart = (index) => {
		const newCart = [...cart];
		newCart.splice(index, 1);
		setCart(newCart);
	};
	console.log(selectedLocation);

	const totalAmount =
		getSubtotal() +
		(serviceType === 'delivery' ? deliveryFee : 0) -
		discountAmount;

	const serviceFee =
		totalAmount < 1000
			? 0
			: Math.min(totalAmount * 0.05, 2000);

	const finalTotal = totalAmount;

	// Function to apply the discount percentage to the order
	const onApplyDiscount = (percentage) => {
		// setDiscountPercentage(percentage);
		const discountedPrice =
			(totalAmount * percentage) / 100;
		setDiscountAmount(discountedPrice);
	};

	const handleValidateDiscount = async () => {
		try {
			const response = await axios.post(
				'https://tradeet-api.onrender.com/discounts/validate',
				{
					businessId: store?._id,
					code,
				},
			);
			console.log(response.data);
			setDiscountInfo(response.data.data);
			setError('');
			onApplyDiscount(response.data.data.percentage); // Callback to apply discount
		} catch (err) {
			setDiscountInfo(null);
			setError(
				err.response?.data?.message ||
					'Error validating discount code',
			);
		}
	};

	// Place Order
	const handlePlaceOrder = async () => {
		if (!validateFields()) return;

		try {
			setLoading(true);
			const orderData = {
				storeId: store?._id,
				customerInfo: {
					name: userDetails.name,
					contact:
						selectedCountryCode + userDetails.whatsapp,
					address:
						address +
						', ' +
						selectedLocation +
						', ' +
						selectedState,
					expoPushToken: userDetails?.expoPushToken,
					pickUp: address ? false : true,
				},
				items: cart,
				payment: {
					type: 'bank',
					status: 'pending',
					timestamp: new Date(), // Payment timestamp
				},
				userId: userDetails?._id,
				totalAmount: finalTotal,
				itemsAmount: totalAmount,
				discountCode: discountInfo
					? discountInfo.code
					: null,
				status: 'pending',
			};

			const response = await axios.post(
				`https://tradeet-api.onrender.com/orders`,
				orderData,
			);

			// console.log(response.data);
			if (
				response.data.message ===
				'Order placed successfully'
			) {
				toast.success('Order placed successfully');
				localStorage.removeItem('cart');
				// console.log(response.data.orderId);
				router.push(
					`/${storeLink}/pay?orderId=${response.data.order._id}`,
				);
				setLoading(false);
			} else {
				toast.error('Error placing order');

				setLoading(false);
			}
		} catch (error) {
			toast.error('Error placing order');
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<div className="container max-w-lg mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">
				{store?.name} Checkout
			</h1>
			<form className="mb-4">
				{/* Customer Details Section */}
				<div className="border-[1px] border-gray-200 p-4 mb-4 rounded-xl">
					<h2 className="text-lg font-bold mb-4">
						Customer Details
					</h2>
					<div className="mb-4">
						<label className="block mb-1 text-sm">
							Name
						</label>
						<input
							type="text"
							name="name"
							value={userDetails.name}
							onChange={handleInputChange}
							className="w-full p-2 text-sm border rounded-lg"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-1 text-sm">
							WhatsApp Number
						</label>
						<div className="flex items-center w-full border border-gray-200 rounded-lg shadow-none">
							<select
								value={selectedCountryCode}
								onChange={(e) =>
									setSelectedCountryCode(e.target.value)
								}
								className="block w-[25%] px-2 py-3 border-r border-gray-200 rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							>
								{countryCodes.map((code) => (
									<option key={code.code} value={code.code}>
										{`${code.code}`}
									</option>
								))}
							</select>
							<input
								type="text"
								name="whatsapp"
								value={userDetails.whatsapp}
								onChange={handleInputChange}
								placeholder="123 4567 890"
								className="block w-[75%] px-4 py-3 border-0 rounded-r-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								required
							/>
						</div>
					</div>
				</div>

				{/* Delivery / Pickup Section */}
				<div className="border-[1px] border-gray-200 p-4 mb-4 rounded-xl">
					<h2 className="text-lg font-bold mb-4">
						Delivery / Pickup
					</h2>
					<div className="mb-4">
						<select
							value={serviceType}
							onChange={handleServiceChange}
							className="w-full p-2 text-sm border rounded-lg"
						>
							<option
								value={'self-pickup | ' + store?.address}
							>
								Self Pickup - {store?.address}
							</option>
							{/* <option value="delivery">Delivery</option> */}
						</select>
					</div>

					{serviceType === 'delivery' && (
						<>
							{/* Select State */}
							<div className="mb-4">
								<label className="block mb-1 text-sm">
									State
								</label>
								<select
									value={selectedState}
									onChange={handleStateChange}
									className="w-full p-2 text-sm border rounded-lg"
								>
									<option value="">Select State</option>
									{deliveryServices?.map((service) =>
										service?.deliveryDetails?.map(
											(detail) => (
												<option
													key={detail.state}
													value={detail.state}
												>
													{detail.state}
												</option>
											),
										),
									)}
								</select>
							</div>

							{/* Select Location */}
							{availableLocations?.length > 0 && (
								<div className="mb-4">
									<label className="block mb-1 text-sm">
										Location
									</label>
									<select
										value={selectedLocation}
										onChange={handleLocationChange}
										className="w-full p-2 text-sm border rounded-lg"
									>
										<option value="">
											Select Location
										</option>
										{availableLocations?.map((location) => (
											<option
												key={location.location}
												value={location.location}
											>
												{location.location} - ₦
												{location.fee}
											</option>
										))}
									</select>
								</div>
							)}

							{/* Address Input */}
							<div className="mb-4">
								<label className="block mb-1 text-sm">
									Address
								</label>
								<textarea
									value={address}
									onChange={handleAddressChange}
									className="w-full p-2 text-sm border rounded-lg"
									required
								/>
							</div>
						</>
					)}
				</div>

				{/* Discount Code Section */}
				<div className="border-[1px] border-gray-200 p-4 mb-4 rounded-xl">
					<div>
						<h2 className="text-lg font-bold mb-4">
							Discount Code
						</h2>
						<div className="flex space-x-4">
							<input
								type="text"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								placeholder="Enter discount code"
								className="flex-grow p-2 text-sm border rounded-lg"
							/>
							<button
								type="button"
								onClick={() => handleValidateDiscount()}
								className="p-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg"
							>
								Apply
							</button>
						</div>
						{error && (
							<p className="text-red-500 text-sm">
								{error}
							</p>
						)}
						{discountInfo && (
							<p className="px-2 py-2 mt-2 text-sm bg-slate-100 rounded-lg">
								🎁 Discount Applied -{' '}
								{discountInfo?.percentage}% off!
							</p>
						)}
					</div>
				</div>

				{/* Order Summary Section */}
				<div className="border-[1px] border-gray-200 p-4 mb-4 rounded-xl">
					<h2 className="text-lg font-bold mb-4">
						Order Summary
					</h2>
					<div className="space-y-2">
						{cart.map((item, index) => (
							<>
								<div
									key={index}
									className="flex items-start justify-between"
								>
									<div>
										<h3 className="text-md font-semibold">
											{item.name}
										</h3>
										{item?.variant ? (
											<p className="text-gray-600 text-sm">
												{item?.variant?.name} - ₦
												{new Intl.NumberFormat(
													'en-US',
												).format(item?.variant?.price)}
											</p>
										) : (
											<p className="text-gray-600 text-sm">
												₦
												{new Intl.NumberFormat(
													'en-US',
												).format(item?.price)}
											</p>
										)}
										{item?.additions?.length > 0 && (
											<div className="mt-2">
												<p className="font-medium">
													Additions:
												</p>
												<ul>
													{item?.additions.map((add) => (
														<li
															key={add._id}
															className="text-gray-600"
														>
															{add.name} - ₦
															{new Intl.NumberFormat(
																'en-US',
															).format(add.price)}
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
									<div className="flex items-center space-x-2">
										<button
											type="button"
											onClick={() =>
												decreaseQuantity(index)
											}
											className="px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded-lg"
										>
											-
										</button>
										<p className="text-xs text-gray-500">
											{item.quantity}
										</p>
										<button
											type="button"
											onClick={() =>
												increaseQuantity(index)
											}
											className="px-2 py-1 text-sm font-semibold text-white bg-green-500 rounded-lg"
										>
											+
										</button>
										<button
											type="button"
											onClick={() =>
												removeItemFromCart(index)
											}
											className="text-red-500"
										>
											<IoMdTrash size={20} />
										</button>
									</div>
								</div>
								<hr />
							</>
						))}
					</div>

					<div className="mt-4 text-right">
						<p className="text-sm">
							Subtotal: ₦{getSubtotal()}
						</p>
						{serviceType === 'delivery' && (
							<p className="text-sm">
								Delivery Fee: ₦{deliveryFee}
							</p>
						)}
						{discountInfo && (
							<p className="text-sm text-red-500">
								Discount: ₦{discountAmount}
							</p>
						)}
						<p className="text-lg font-bold">
							Total: ₦{finalTotal}
						</p>
					</div>
				</div>

				{/* Place Order Button */}
				<button
					type="button"
					onClick={handlePlaceOrder}
					disabled={loading}
					className="w-full p-4 text-sm font-semibold text-white bg-green-500 rounded-lg"
				>
					{loading ? 'Placing Order...' : 'Place Order'}
				</button>
			</form>
		</div>
	);
};

export default CheckoutPage;
