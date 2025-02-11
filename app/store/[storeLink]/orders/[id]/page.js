'use client';
import NormalStoreNavbar from '@/components/NormalStoreNav';
import { getStoreData } from '@/app/lib/api';
import axiosClient from '@/utils/axios';
import Link from 'next/link';
import {
	useParams,
	useRouter,
	useSearchParams,
} from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import {
	FaArrowLeft,
	FaChevronLeft,
	FaChevronRight,
	FaPrint,
	FaTimes,
	FaWhatsapp,
} from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

const Page = () => {
	const { storeLink } = useParams();
	const router = useRouter();
	const { id } = useParams();
	const orderId = id;
	const [store, setStore] = useState(null);
	const [loading, setLoading] = useState(false);
	const [order, setOrder] = useState(null);
	const divRef = useRef();

	useEffect(() => {
		const fetchStore = async () => {
			try {
				setLoading(true);
				const storeData = await getStoreData(storeLink);
				if (storeData) {
					setStore(storeData);
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.error('Error fetching store data:', error);
			}
		};

		const fetchOrder = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`https://tradeet-api.onrender.com/orders/${orderId}`,
				);
				console.log(response.status);
				if (response.status === 200) {
					const order = response.data;
					if (order) {
						setOrder(order);
					}
					setLoading(false);
				}
			} catch (error) {
				setLoading(false);
				console.error('Error fetching order:', error);
			}
		};

		fetchOrder();
		fetchStore();
	}, [storeLink]);

	// console.log(order);

	const storeData = store;

	const formatDate = (dateString) => {
		try {
			// Convert the dateString to a Date object
			const date = new Date(dateString);

			// Check if the date is valid
			if (isNaN(date.getTime())) {
				throw new Error('Invalid Date');
			}

			// Define options for date and time formatting
			const dateOptions = {
				day: '2-digit',
				month: 'short',
				year: 'numeric',
			};
			const timeOptions = {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			};

			// Format date and time separately
			const formattedDate = new Intl.DateTimeFormat(
				'en-GB',
				dateOptions,
			).format(date);
			const formattedTime = new Intl.DateTimeFormat(
				'en-GB',
				timeOptions,
			).format(date);

			// Combine date and time
			return `${formattedDate} ${formattedTime}`;
		} catch (error) {
			console.error('Error formatting date:', error);
			return 'Invalid Date';
		}
	};

	const sendMessage = () => {
		const {
			_id,
			cart,
			name,
			whatsapp,
			totalAmount,
			serviceType,
			status,
		} = order;

		const formatCartItems = cart
			?.map((item, index) => {
				const itemPrice = item?.variant
					? `${
							item?.variant?.name
					  } - ₦${new Intl.NumberFormat('en-US').format(
							item?.variant?.price,
					  )}`
					: `₦${new Intl.NumberFormat('en-US').format(
							item?.price,
					  )}`;

				return `*#${index + 1}* *${item.quantity}x* ${
					item.name
				} ${itemPrice}`;
			})
			.join('\n');

		const message = encodeURIComponent(
			`*${status} Order*\n\n` +
				`${formatCartItems}\n\n` +
				`Item total: ₦${totalAmount.toLocaleString()}.00 (Qty: ${
					cart?.length
				})\n\n` +
				`*Total: ₦${totalAmount.toLocaleString()}.00*\n\n` +
				`Customer: *${name}* ${whatsapp}\n\n` +
				`Service: *${
					serviceType.charAt(0).toUpperCase() +
					serviceType.slice(1)
				}*\n\n` +
				`See invoice https://tradeet.ng/store/${storeData?.storeLink}/orders/${_id}\n\n` +
				`Sent from Tradeet https://tradeet.ng/store/${storeData?.storeLink}`,
		);

		const whatsappUrl = `https://wa.me/${storeData?.whatsapp?.replace(
			'+',
			'',
		)}?text=${message}`;

		window.open(whatsappUrl, '_blank');
	};

	const handleDownloadPDF = (storeData) => {
		const divElement = divRef.current;

		// Capture the div as an image
		html2canvas(divElement, { scale: 2 }).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'mm', 'a4');

			const imgWidth = 210; // A4 page width in mm
			const imgHeight =
				(canvas.height * imgWidth) / canvas.width;

			// Add the image to the PDF
			pdf.addImage(
				imgData,
				'PNG',
				0,
				0,
				imgWidth,
				imgHeight <= 297 ? imgHeight : 297,
			);

			// Add clickable links manually by selecting the elements with the anchor tag
			const links = divElement.querySelectorAll('a');
			links.forEach((link) => {
				const href = link.href;
				const rect = link.getBoundingClientRect();
				const pageHeight = 297; // A4 height in mm

				// Convert DOM coordinates to PDF coordinates (top and left offset)
				const linkX = (rect.left / canvas.width) * imgWidth;
				const linkY =
					(rect.top / canvas.height) * imgHeight;
				const linkWidth =
					(rect.width / canvas.width) * imgWidth;
				const linkHeight =
					(rect.height / canvas.height) * imgHeight;

				// Make sure the link fits the page
				if (linkY + linkHeight <= pageHeight) {
					pdf.link(linkX, linkY, linkWidth, linkHeight, {
						url: href,
					});
				}
			});

			// Save the PDF
			pdf.save(
				`${storeData?.name} #${order?.orderNumber} invoice.pdf`,
			);
		});
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div className="bg-[#F6F7F9]">
			<NormalStoreNavbar storeData={storeData} />
			<div className="container bg-[#F6F7F9] min-h-screen max-w-lg mx-auto pt-20 px-4">
				<div className="flex flex-row justify-between items-center mb-4">
					<div
						onClick={() =>
							router.push(`/store/${storeData?.storeLink}`)
						}
						className="flex cursor-pointer flex-row gap-1 items-center"
					>
						<FaChevronLeft
							className="cursor-pointer"
							size={20}
						/>
						<h1 className="underline underline-offset-2">
							Back to Store
						</h1>
					</div>

					<div className="flex flex-row gap-3 items-center">
						{/* <div
							onClick={() => sendMessage()}
							className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
						>
							<FaWhatsapp />
						</div> */}
						<div
							onClick={() => handleDownloadPDF(storeData)}
							className="border cursor-pointer hover:bg-slate-800 text-center text-sm text-white bg-black font-bold py-2 px-4 rounded-lg"
						>
							<p>Download receipt</p>
						</div>
					</div>
				</div>
				<div>
					<p className="text-center">
						Kindly <span className="font-bold">ensure</span>{' '}
						you download your receipt. Thank you!
					</p>
				</div>
				<div
					ref={divRef}
					className="bg-white p-6 mt-8 shadow-md rounded-2xl"
				>
					<div className="flex flex-row justify-between items-center">
						<div
							className={`text-sm capitalize mb-2 flex text-center items-center justify-start py-2 px-4 rounded-lg font-semibold ${
								order?.payment.status === 'pending'
									? 'bg-yellow-50 text-yellow-500'
									: order?.payment.status === 'completed'
									? 'bg-green-50 text-green-500'
									: 'bg-red-50 text-red-500'
							}`}
						>
							{order?.payment.status === 'completed'
								? 'Paid'
								: 'Not paid'}
						</div>
						<div className="flex flex-col items-center">
							<p className="text-sm text-gray-400">
								Pick-up Code
							</p>
							<h1 className="text-xl text-slate-800 font-bold">
								{order?.deliveryCode}
							</h1>
						</div>
					</div>
					<h1 className="text-2xl font-bold">
						{storeData?.name}
					</h1>
					<div className="my-5">
						<div className="text-sm flex flex-row gap-3">
							<p>Order No.</p>
							<p>#{order?.orderNumber}</p>
						</div>
						<div className="flex text-sm flex-row gap-3">
							<p>Order date</p>
							<p>{formatDate(order?.createdAt)}</p>
						</div>
					</div>
					<hr />
					<div className="my-5">
						<h1 className="text-lg font-semibold">Items</h1>
						<div className="mt-3">
							{order?.items?.map((item, index) => (
								<div
									key={index}
									className="flex flex-row mb-2 items-start justify-between"
								>
									<div className="flex flex-row gap-3 ">
										<p className="text-sm">
											{item.quantity}x
										</p>
										<p className="text-sm font-normal text-blue-500 underline-offset-2 pr-3">
											{item.name}
											{item?.addOns?.length > 0 && (
												<div className="mt-2">
													<p className="font-sm">
														Add-ons:
													</p>
													<ul>
														{item?.addOns.map((add) => (
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
										</p>
									</div>
									<div className="flex flex-col">
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
												).format(
													item?.basePrice * item?.quantity,
												)}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
					<hr />
					<div className="my-3">
						<div className="flex flex-row justify-between items-center text-sm">
							<p>Items total ({order?.items?.length})</p>
							<p>₦{order?.itemsAmount}</p>
						</div>
						{order?.deliveryFee > 0 && (
							<div className="flex flex-row justify-between items-center text-sm">
								<p>Delivery Fee</p>
								<p>₦{order?.deliveryFee}</p>
							</div>
						)}
						<div className="flex flex-row justify-between items-center text-sm">
							<p>Service Fee</p>
							<p>₦{order?.serviceFee}</p>
						</div>
					</div>
					<hr />

					{order?.discountCode && (
						<div>
							<div className="my-3">
								<div className="flex flex-row justify-between items-center text-sm">
									<p>Discount Code</p>
									<p>{order?.discountCode}</p>
								</div>
							</div>
							<hr />
						</div>
					)}
					<div className="my-4">
						<div className="flex flex-row justify-between items-center font-bold text-md">
							<p className="font-bold text-md">
								Amount Paid
							</p>
							<p>₦{order?.totalAmount}</p>
						</div>
					</div>
					<hr />
					<div className="my-5">
						<h1 className="text-lg font-semibold">
							Order Details
						</h1>
						<div className="my-3">
							<div className="text-sm">
								<p className="text-xs text-gray-500">
									Customer
								</p>
								<p>
									{order?.customerInfo?.name} /{' '}
									{order?.customerInfo?.contact}
								</p>
							</div>
							<div className="text-sm mt-2">
								<p className="text-xs text-gray-500">
									Delivery Option (
									{order?.customerInfo?.pickUp
										? 'pick-up'
										: 'delivery'}
									)
								</p>
								<p className="capitalize">
									{order?.customerInfo?.pickUp &&
										`${storeData?.address}`}{' '}
									{!order?.customerInfo?.pickUp &&
										`${order?.customerInfo?.address}`}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
