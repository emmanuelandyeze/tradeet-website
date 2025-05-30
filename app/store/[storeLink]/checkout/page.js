'use client';

import React, { useEffect, useState } from 'react';
import { IoMdTrash } from 'react-icons/io';
import {
	useParams,
	useRouter,
	useSearchParams,
} from 'next/navigation';
import axiosClient from '@/utils/axios';
import axios from 'axios';
import { getStoreData } from '@/app/lib/api';
import StoreLocationPicker from '@/components/StoreLocationPicker';
import NormalStoreNavbar from '@/components/NormalStoreNav';
import { toast } from 'react-toastify';
import Modal from '@/components/Modal';

const countryCodes = [{ code: '+234', country: 'Nigeria' }];

const CheckoutPage = () => {
	const searchParams = useSearchParams();
	const { storeLink } = useParams();
	const router = useRouter();
	const advId = searchParams.get('ad');
	const [cart, setCart] = useState([]);
	const [userDetails, setUserDetails] = useState({
		name: '',
		whatsapp: '',
	});
	const [serviceType, setServiceType] =
		useState('delivery');
	const [address, setAddress] = useState('');
	const [discountCode, setDiscountCode] = useState('');
	const [discountApplied, setDiscountApplied] =
		useState(false);
	const [selectedCountryCode, setSelectedCountryCode] =
		useState(countryCodes[0].code);
	const [store, setStore] = useState(null);
	const [deliveryFee, setDeliveryFee] = useState(400);
	const [deliveryServices, setDeliveryServices] = useState(
		[],
	);
	const [landmark, setLandmark] = useState('');
	const [loading, setLoading] = useState(false);
	const [adLoading, setAdLoading] = useState(false);
	const [discountAmount, setDiscountAmount] = useState(0);
	const [code, setCode] = useState('');
	const [discountInfo, setDiscountInfo] = useState(null);
	const [error, setError] = useState('');

	const [isOpen, setIsOpen] = useState(true); // Track if store is open
	const [nextOpeningTime, setNextOpeningTime] =
		useState(null); // Next available time
	const [showScheduleModal, setShowScheduleModal] =
		useState(false); // Modal state
	const [scheduledTime, setScheduledTime] = useState(null); // Selected scheduled time

	const checkBusinessOpenStatus = async () => {
		try {
			const response = await axiosClient.get(
				`/businesses/store/${storeLink}`,
			);
			const { openingHours } = response.data.business;

			const now = new Date();
			const currentDay = new Intl.DateTimeFormat('en-US', {
				weekday: 'long',
			}).format(now);
			const currentMinutes =
				now.getHours() * 60 + now.getMinutes();

			const todayHours = openingHours[currentDay];

			let isOpenNow = false;
			let nextOpeningTime = null;

			// Check if store is open today
			if (todayHours && todayHours.open !== null) {
				const openingTimeMinutes = todayHours.open * 60;
				const closingTimeMinutes = todayHours.close * 60;

				// Check if the current time is within opening hours
				isOpenNow =
					currentMinutes >= openingTimeMinutes &&
					currentMinutes < closingTimeMinutes;
			}

			// If store is closed, find next opening day
			if (!isOpenNow) {
				const days = [
					'Sunday',
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
				];

				let index = days.indexOf(currentDay);

				// Loop through the next 7 days to find when the store opens next
				for (let i = 0; i < 7; i++) {
					index = (index + 1) % 7; // Move to the next day
					const day = days[index];

					if (
						openingHours[day] &&
						openingHours[day].open !== null
					) {
						nextOpeningTime = {
							day,
							time: openingHours[day].open, // Opening hour in 24-hour format
						};
						break;
					}
				}
			}

			// Update state accordingly
			setIsOpen(isOpenNow);
			setNextOpeningTime(nextOpeningTime);

			console.log('isOpenNow:', isOpenNow);
			console.log('Next Opening Time:', nextOpeningTime);
		} catch (error) {
			console.error(
				'Error fetching business hours:',
				error,
			);
		}
	};

	useEffect(() => {
		checkBusinessOpenStatus();
	}, []);

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

	// console.log(cart);

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

	const validateFields = () => {
		if (!userDetails.name || !userDetails.whatsapp) {
			const notify = toast(
				'Please fill in all customer details.',
			);
			notify();
			return false;
		}

		if (serviceType === 'delivery' && !address) {
			const notify = toast(
				'Please fill in the delivery address.',
			);
			notify();
			return false;
		}

		if (cart.length === 0) {
			const notify = toast('Your cart is empty.');
			notify();
			return false;
		}

		return true;
	};

	// Calculate Total Amount
	const getTotalAmount = () => {
		return cart.reduce((total, item) => {
			const addOnsTotal =
				item.addOns?.reduce(
					(sum, addOn) =>
						sum + addOn.price * addOn.quantity,
					0,
				) || 0;
			const variantsTotal =
				item.variants?.reduce(
					(sum, variant) =>
						sum + variant.price * variant.quantity,
					0,
				) || 0;
			return (
				total +
				item.basePrice * item.quantity +
				addOnsTotal +
				variantsTotal
			);
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
	const removeCartItem = (productId) => {
		const confirmClear = window.confirm(
			'Are you sure you want to remove this item from your cart?',
		);
		if (confirmClear) {
			setCart((prevCart) => {
				const updatedCart = prevCart.filter(
					(item) => item.productId !== productId,
				);
				localStorage.setItem(
					'cart',
					JSON.stringify(updatedCart),
				); // Update localStorage
				return updatedCart;
			});
		}
	};

	const totalAmount =
		getSubtotal() +
		(serviceType === 'delivery' ? deliveryFee : 0) -
		discountAmount;

	const serviceFee =
		totalAmount < 1500
			? 50
			: Math.min(totalAmount * 0.1, 1500);

	const finalTotal = totalAmount + serviceFee;

	// Function to apply the discount percentage to the order
	const onApplyDiscount = (percentage) => {
		// setDiscountPercentage(percentage);
		const discountedPrice =
			(totalAmount * percentage) / 100;
		setDiscountAmount(discountedPrice);
	};

	const handleValidateDiscount = async () => {
		try {
			const response = await axiosClient.post(
				'/discounts/validate',
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

	// console.log(scheduledTime);

	// Place Order
	const handlePlaceOrder = async () => {
		if (!validateFields()) return;

		if (!isOpen && !scheduledTime) {
			// console.log('hello');
			// Show modal if store is closed and no scheduled time is selected
			setShowScheduleModal(true);
			return;
		}

		try {
			setLoading(true);

			const orderData = {
				storeId: store?._id,
				customerInfo: {
					name: userDetails.name,
					contact:
						selectedCountryCode + userDetails.whatsapp,
					address: address ? address : null,
					expoPushToken: userDetails?.expoPushToken,
					pickUp: address ? false : true,
				},
				items: cart,
				payment: {
					type: 'bank',
					status: 'pending',
					timestamp: new Date(),
				},
				userId: userDetails?._id,
				totalAmount: finalTotal,
				itemsAmount: getSubtotal(),
				discountCode: discountInfo
					? discountInfo.code
					: null,
				status: 'pending',
				deliveryFee:
					serviceType === 'delivery' ? deliveryFee : 0,
				serviceFee: serviceFee,
				discountAmount: discountAmount,
				scheduledTime: scheduledTime
					? new Date(scheduledTime)
					: null, // Include if scheduled
			};

			const response = await axiosClient.post(
				`/orders`,
				orderData,
			);

			if (
				response.data.message ===
				'Order placed successfully'
			) {
				toast.success('Order placed successfully');
				localStorage.removeItem('cart');
				router.push(
					`/store/${storeLink}/pay?orderId=${response.data.order._id}`,
				);
			} else {
				toast.error('Error placing order');
			}
		} catch (error) {
			toast.error('Error placing order');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<NormalStoreNavbar storeData={store} />
			<div className="flex max-w-5xl mx-auto flex-col justify-center px-4 pt-20 gap-3 max-auto">
				<h1 className="text-2xl text-center font-bold mb-4">
					{store?.name} Checkout
				</h1>
				<form className="mb-4 flex flex-col w-full mx-auto justify-center gap-2 md:gap-5 md:flex-row">
					<div className="md:w-[50%]">
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
											<option
												key={code.code}
												value={code.code}
											>
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
								Delivery Information
							</h2>
							<div className="mb-4">
								<select
									value={serviceType}
									onChange={handleServiceChange}
									className="w-full p-2 text-sm border rounded-lg"
								>
									<option
										value={
											'self-pickup | ' + store?.address
										}
									>
										Self Pickup - {store?.address}
									</option>
									<option value="delivery">Delivery</option>
								</select>
							</div>

							{serviceType === 'delivery' && (
								<>
									{/* Address Input */}
									<div className="mb-4">
										<label className="block mb-1 text-sm">
											Address*
										</label>
										<textarea
											value={address}
											onChange={handleAddressChange}
											className="w-full p-2 text-sm border rounded-lg"
											required
										/>
									</div>
									{/* <StoreLocationPicker
										store={store}
										setDeliveryFee={setDeliveryFee}
										setLandmark={setAddress}
									/> */}
								</>
							)}
						</div>
					</div>

					<div className="md:w-[50%]">
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
										onChange={(e) =>
											setCode(e.target.value)
										}
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
								{cart.length > 0 ? (
									<ul>
										{cart.map((item, index) => (
											<li
												key={index}
												className="flex flex-col mb-4"
											>
												<div className="flex items-start">
													<img
														src={item.image}
														alt={item.name}
														className="w-12 h-12 object-cover rounded"
													/>
													<div className="ml-4">
														<p className="font-medium">
															{item.name} - x{item.quantity}
														</p>
														<p className="text-gray-600">
															₦
															{item.basePrice *
																item.quantity}
														</p>
														{item.variants?.map(
															(variant, idx) => (
																<p
																	key={idx}
																	className="text-sm text-gray-500"
																>
																	{variant.name} - ₦
																	{variant.price} x{' '}
																	{variant.quantity}
																</p>
															),
														)}
														{item.addOns?.map(
															(addOn, idx) => (
																<p
																	key={idx}
																	className="text-sm text-gray-500"
																>
																	{addOn.name} - ₦
																	{addOn.price} x{' '}
																	{addOn.quantity}
																</p>
															),
														)}
													</div>
													<button
														className="mt-1 ml-5"
														onClick={() =>
															removeCartItem(item.productId)
														}
													>
														<IoMdTrash color="red" />
													</button>
												</div>
											</li>
										))}
									</ul>
								) : (
									<div className="flex justify-center items-center">
										<p className="text-center text-2xl text-gray-600">
											Your cart is empty
										</p>
									</div>
								)}
							</div>

							<div className="mt-4 flex pt-5 border-t-[1px] border-slate-300 items-end gap-1 justify-end flex-col">
								<div className="flex flex-row gap-14 items-center">
									<p className="text-sm">Subtotal</p>
									<p className="text-sm">
										₦{getSubtotal()?.toLocaleString()}
									</p>
								</div>
								{serviceType === 'delivery' && (
									<div className="flex flex-row gap-14 items-center">
										<p className="text-sm">Delivery Fee</p>
										<p className="text-sm">
											₦{deliveryFee?.toLocaleString()}
										</p>
									</div>
								)}

								<div className="flex flex-row gap-14 items-center">
									<p className="text-sm">Service fee</p>
									<p className="text-sm">
										₦{serviceFee?.toLocaleString()}
									</p>
								</div>
								{discountInfo && (
									<div className="flex flex-row gap-14 items-center">
										<p className="text-sm font-bold text-red-500">
											Discount
										</p>
										<p className="text-sm font-bold text-red-500">
											- ₦{discountAmount?.toLocaleString()}
										</p>
									</div>
								)}
								<div className="flex flex-row gap-14 items-center">
									<p className="text-lg font-bold">Total</p>
									<p className="text-lg font-bold">
										₦{finalTotal?.toLocaleString()}
									</p>
								</div>
							</div>
						</div>

						{/* Place Order Button */}
						<button
							type="button"
							onClick={() => handlePlaceOrder()}
							disabled={loading}
							className="w-full p-4 text-md font-semibold text-white bg-green-500 rounded-lg"
						>
							{loading ? 'Placing Order...' : 'Place Order'}
						</button>
					</div>
				</form>
				{showScheduleModal && nextOpeningTime && (
					<Modal
						onClose={() => setShowScheduleModal(false)}
					>
						<h2 className="text-xl text-center">
							Store is Currently Closed
						</h2>
						<p className="text-md text-center">
							The store is closed right now. You can
							schedule your order for:
						</p>
						<p className="text-lg my-3 font-bold text-center">
							{nextOpeningTime.day} at{' '}
							{/* {Math.floor(nextOpeningTime.time / 60)}: */}
							{(nextOpeningTime.time % 60)
								.toString()
								.padStart(2, '0')}
							:00{' '}
						</p>
						<br />

						<div className="flex flex-row items-center justify-end gap-5">
							<button
								onClick={() => setShowScheduleModal(false)}
							>
								Cancel
							</button>
							<button
								className="px-6 py-2 rounded-md bg-green-500 text-white"
								onClick={() => {
									setScheduledTime(
										`${nextOpeningTime.day} ${nextOpeningTime.time}:00`,
									);
									setShowScheduleModal(false);
									handlePlaceOrder(); // Retry placing the order with the scheduled time
								}}
							>
								Schedule Order
							</button>
						</div>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default CheckoutPage;
