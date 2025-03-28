// app/store/[storeLink]/orders/[orderId]/status/page.js
'use client';
import { useEffect, useState } from 'react';
import {
	useParams,
	useSearchParams,
} from 'next/navigation';
import axiosClient from '@/utils/axios';
import {
	MdPending,
	MdCheckCircle,
	MdError,
	MdPayment,
} from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

const PaymentStatusPage = () => {
	const { storeLink, id } = useParams();
	const searchParams = useSearchParams();
	const reference = searchParams.get('reference');
	const router = useRouter();
	const [status, setStatus] = useState('pending');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [pollingCount, setPollingCount] = useState(0);
	const maxPollingAttempts = 12; // ~1 minute (5s * 12)

	const orderId = id;
	console.log(orderId)

	useEffect(() => {
		const checkPaymentStatus = async () => {
			try {
				const response = await axiosClient.get(
					`/orders/${orderId}/status`,
				);

				if (response.data.isPaid) {
					setStatus('completed');
					setIsLoading(false);
				} else if (pollingCount >= maxPollingAttempts) {
					setStatus('timeout');
					setIsLoading(false);
				} else {
					setPollingCount((prev) => prev + 1);
					setTimeout(checkPaymentStatus, 5000); // Poll every 5 seconds
				}
			} catch (error) {
				console.error(
					'Error checking payment status:',
					error,
				);
				setStatus('error');
				setError(
					error.response?.data?.message || error.message,
				);
				setIsLoading(false);
			}
		};

		checkPaymentStatus();

		// Cleanup function to prevent memory leaks
		return () => clearTimeout(checkPaymentStatus);
	}, [orderId, pollingCount, maxPollingAttempts]);

	const getStatusContent = () => {
		switch (status) {
			case 'completed':
				return {
					icon: (
						<MdCheckCircle className="text-6xl text-green-500 mx-auto my-4" />
					),
					title: 'Payment Successful!',
					message: 'Your payment has been confirmed.',
					action: (
						<button
							onClick={() =>
								router.push(
									`/store/${storeLink}/orders/${orderId}`,
								)
							}
							className="bg-black text-white px-6 py-2 rounded-lg mt-4"
						>
							View Order Details
						</button>
					),
				};
			case 'timeout':
				return {
					icon: (
						<MdPayment className="text-6xl text-yellow-500 mx-auto my-4" />
					),
					title: 'Payment Processing',
					message:
						"We're still verifying your payment. Please check back later.",
					action: (
						<button
							onClick={() =>
								router.push(
									`/store/${storeLink}/orders/${orderId}`,
								)
							}
							className="bg-gray-200 text-black px-6 py-2 rounded-lg mt-4"
						>
							Check Order Status
						</button>
					),
				};
			case 'error':
				return {
					icon: (
						<MdError className="text-6xl text-red-500 mx-auto my-4" />
					),
					title: 'Payment Verification Failed',
					message:
						error ||
						"We couldn't verify your payment status.",
					action: (
						<div className="flex gap-2 justify-center">
							<button
								onClick={() => window.location.reload()}
								className="bg-gray-200 text-black px-4 py-2 rounded-lg mt-4"
							>
								Try Again
							</button>
							<button
								onClick={() =>
									router.push(`/store/${storeLink}`)
								}
								className="bg-black text-white px-4 py-2 rounded-lg mt-4"
							>
								Back to Store
							</button>
						</div>
					),
				};
			default:
				return {
					icon: (
						<FaSpinner className="text-6xl text-blue-500 mx-auto my-4 animate-spin" />
					),
					title: 'Verifying Payment...',
					message: 'This may take a few moments.',
					action: null,
				};
		}
	};

	const content = getStatusContent();

	return (
		<div className="container max-w-lg mx-auto p-4 text-center min-h-[60vh] flex flex-col justify-center">
			{content.icon}
			<h1 className="text-2xl font-bold mb-2">
				{content.title}
			</h1>
			<p className="mb-6">{content.message}</p>
			{content.action}

			{status === 'pending' && (
				<p className="text-sm text-gray-500 mt-8">
					Checking attempt {pollingCount + 1} of{' '}
					{maxPollingAttempts}
				</p>
			)}
		</div>
	);
};

export default PaymentStatusPage;
