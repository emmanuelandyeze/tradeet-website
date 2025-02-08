'use client';
import { getStoreData } from '@/app/lib/api';
import axiosClient from '@/utils/axios';
import {
	useParams,
	useRouter,
	useSearchParams,
} from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaChevronRight, FaTimes } from 'react-icons/fa';
import {
	PaystackButton,
	usePaystackPayment,
} from 'react-paystack';
import { MdVerifiedUser } from 'react-icons/md';
import { channel } from 'process';
import axios from 'axios';

const Page = () => {
	const { storeLink } = useParams();
	const router = useRouter();
	const searchParams = useSearchParams();
	const orderId = searchParams.get('orderId');
	const [store, setStore] = useState(null);
	const [order, setOrder] = useState(null);
	const [email, setEmail] = useState('');
	const [
		isBankTransferModalOpen,
		setIsBankTransferModalOpen,
	] = useState(false);
	const [
		isPayOnDeliveryModalOpen,
		setIsPayOnDeliveryModalOpen,
	] = useState(false);

	useEffect(() => {
		const fetchStore = async () => {
			try {
				const storeData = await getStoreData(storeLink);
				if (storeData) {
					setStore(storeData);
				}
			} catch (error) {
				console.error('Error fetching store data:', error);
			}
		};

		const fetchOrder = async () => {
			try {
				const response = await axios.get(
					`https://tradeet-api.onrender.com/orders/${orderId}`,
				);
				console.log(response);
				if (response.status === 200) {
					const order = response.data;
					if (order) {
						setOrder(order);
					}
				}
			} catch (error) {
				console.error('Error fetching order:', error);
			}
		};

		fetchOrder();
		fetchStore();
	}, [storeLink]);

	const handlePaymentConfirmation = async () => {
		try {
			const response = await axios.put(
				`https://tradeet-api.onrender.com/orders/${orderId}/pay`,
				{
					type: 'bank',
					status: 'completed',
					statusUpdatedAt: Date.now(),
				},
			);
			if (response.data.statusText === 'success') {
				toast.success('Payment complete');
				router.push(
					`/store/${storeLink}/orders/${orderId}`,
				);
				setIsBankTransferModalOpen(false);
				setIsPayOnDeliveryModalOpen(false);
			} else {
				toast.error('Error confirming payment');
			}
		} catch (error) {
			toast.error('Error confirming payment');
			console.error(error);
		}
	};

	const amount = order?.totalAmount;

	const formattedProducts = order?.items?.map(
		(product) => ({
			name: product.name,
			quantity: product.quantity,
			price: product.price,
			image: product.images[0],
		}),
	);

	const config = {
		reference: new Date().getTime().toString(),
		email: email,
		amount: amount * 100,
		publicKey:
			'pk_test_b73dfa772179733254e4372f9bf2be4428f28d93',
		metadata: {
			products: formattedProducts,
		},
		channel: ['card', 'transfer', 'ussd'],
	};

	const handlePaystackSuccessAction = (reference) => {
		// Implementation for whatever you want to do with reference and after success call.
		console.log(reference);
		if (reference.status === 'success') {
			handlePaymentConfirmation();
		}
	};

	// you can call this function anything
	const handlePaystackCloseAction = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log('closed');
	};

	const componentProps = {
		...config,
		text: 'Pay Now',
		onSuccess: (reference) =>
			handlePaystackSuccessAction(reference),
		onClose: handlePaystackCloseAction,
	};

	const storeData = store;

	return (
		<div className="container max-w-lg mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">
				{storeData?.name} Payment
			</h1>

			<div>
				<div className="border-[1px] border-gray-200 p-4 mt-20 mb-4 rounded-xl">
					<div className="mb-4">
						<h1 className="text-md text-center font-normal mb-4">
							How would you like to pay?
						</h1>
						<div
							onClick={() =>
								setIsPayOnDeliveryModalOpen(true)
							}
							className="flex items-start flex-col border rounded-xl p-4 my-4"
						>
							<div className="flex flex-row justify-between items-center w-full cursor-pointer">
								<p className="text-md font-semibold">
									Pay with Tradeet
								</p>
								<FaChevronRight className="text-gray-500" />
							</div>
							<div className="flex items-center flex-row mt-1 gap-1">
								<MdVerifiedUser color="green" />
								<p className="text-sm">
									Secure payment method.{' '}
									<span className="text-blue-500">
										Learn more
									</span>
								</p>
							</div>
						</div>
						{/* <div className="flex items-start flex-row border rounded-xl p-4 my-3">
							<div
								onClick={() =>
									setIsBankTransferModalOpen(true)
								}
								className="flex flex-row justify-between items-center w-full cursor-pointer"
							>
								<p className="text-md font-semibold">
									Direct Bank Transfer
								</p>
								<FaChevronRight className="text-gray-500" />
							</div>
						</div> */}
					</div>
				</div>
			</div>

			{isBankTransferModalOpen && (
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
					<div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
						<div className="flex w-full justify-end">
							<FaTimes
								onClick={() =>
									setIsBankTransferModalOpen(false)
								}
								className=" text-red-500 cursor-pointer"
							/>
						</div>
						<div className="text-center">
							<h2 className="text-xs font-normal mb-2">
								Amount to pay
							</h2>
							<h1 className="text-3xl font-bold">
								NGN{' '}
								{new Intl.NumberFormat('en-US').format(
									order?.totalAmount,
								)}
							</h1>
							<p className="my-4 text-center">
								Please include the{' '}
								<span className="font-bold text-xl">
									INVOICE NUMBER
								</span>{' '}
								in the description and click the button when
								paymennt is made.
							</p>
						</div>
						<div className="bg-gray-100 p-4 rounded-xl my-4">
							<div className="mb-4 flex flex-row items-center justify-between">
								<p>Bank Name</p>
								<p>{storeData?.bankName}</p>
							</div>

							<div className="mb-4 flex flex-row items-center justify-between">
								<p>Account Number</p>
								<p>{storeData?.accountNumber}</p>
							</div>
							<div className="mb-4 flex flex-row items-center justify-between">
								<p>Invoice ID</p>
								<p>{order?.invoiceNumber}</p>
							</div>
						</div>
						<button
							onClick={() =>
								handlePaymentConfirmation('Pending', false)
							}
							className="bg-black w-full text-white px-4 py-2 rounded-lg mb-2"
						>
							I have made the payment
						</button>
						<button
							onClick={() =>
								setIsBankTransferModalOpen(false)
							}
							className="bg-transparent w-full text-black hover:bg-gray-100 px-4 py-2 rounded-lg mr-2"
						>
							Talk to seller before payment
						</button>
					</div>
				</div>
			)}

			{isPayOnDeliveryModalOpen && (
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
					<div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
						<div className="flex w-full justify-end">
							<FaTimes
								onClick={() =>
									setIsPayOnDeliveryModalOpen(false)
								}
								className=" text-red-500 cursor-pointer"
							/>
						</div>

						<div className="flex flex-row items-center gap-1 mb-4">
							<h2 className="text-xl font-bold">
								Pay with Tradeet
							</h2>
							<MdVerifiedUser color="green" />
						</div>

						<div className="text-center">
							<h2 className="text-xs font-normal mb-2">
								Amount to pay
							</h2>
							<h1 className="text-3xl font-bold">
								NGN {order?.totalAmount}
							</h1>
						</div>
						<p className="my-4 text-center">
							We{' '}
							<span className="font-bold text-xl">
								ONLY
							</span>{' '}
							pay the store upon successful delivery of your
							order.
						</p>
						<div className="bg-gray-100 py-2 px-4 rounded-xl my-4">
							<input
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full p-2 text-sm border rounded-l-lg"
								placeholder="Email Address"
							/>
						</div>
						{/* <button
							onClick={() =>
								initializePayment(onSuccess, onClose)
							}
							disabled={!email}
							className="bg-black w-full text-white px-4 py-2 rounded-lg mr-2"
						>
							Pay Now
						</button> */}
						<PaystackButton
							className="bg-black w-full text-white px-4 py-2 rounded-lg mr-2"
							{...componentProps}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Page;
