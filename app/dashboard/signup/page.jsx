'use client';

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

const IMAGES = [
	// '/images/landing.jpg',
	'/analysis.jpg',
	// '/card.jpg',
];

export default function Signup() {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [phone, setPhone] = useState('');
	const [otp, setOtp] = useState('');
	const [logo, setLogo] = useState(null);
	const [preview, setPreview] = useState(null);
	const [businessName, setBusinessName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] =
		useState('');
	const [currentImageIndex, setCurrentImageIndex] =
		useState(0);
    const [errors, setErrors] = useState({});
    
    const {
			verifyPhoneNumber,
			verifyCode,
			completeProfile,
		} = useContext(AuthContext);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(
				(prev) => (prev + 1) % IMAGES.length,
			);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	const validateStep = () => {
		const newErrors = {};
		if (step === 1 && !phone)
			newErrors.phone = 'Phone number is required';
		if (step === 2 && !otp)
			newErrors.otp = 'OTP is required';
		if (step === 3) {
			if (!businessName)
				newErrors.businessName = 'Business name required';
			if (!email) newErrors.email = 'Email required';
		}
		if (step === 4) {
			if (!password)
				newErrors.password = 'Password is required';
			if (password !== confirmPassword)
				newErrors.confirmPassword =
					'Passwords do not match';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSendOTP = async () => {
		if (!validateStep()) return;
		try {
			await verifyPhoneNumber(phone);
			setStep(2);
		} catch {
			alert('Failed to send OTP');
		}
	};

	const handleVerifyOTP = async () => {
		if (!validateStep()) return;
		try {
			await verifyCode(phone, otp);
			setStep(3);
		} catch {
			alert('Invalid OTP');
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setLogo(file);
		setPreview(URL.createObjectURL(file));
	};

	const handleFinalSubmit = async () => {
		if (!validateStep()) return;
		try {
			const profile = {
				logoUrl: '',
				name: businessName,
				address: '',
				phone: phone,
				password: password,
				serviceType: 'products', // Add selected service
				isVendor: true,
				email: email,
			};

			console.log(profile);

			const res = await completeProfile(profile);
			if (res.message === 'Profile setup completed') {
				router.push('/dashboard');
			} else {
				alert('Failed to create account');
			}
		} catch {
			alert('Signup failed');
		}
	};

	return (
		<div className="flex h-screen w-full overflow-hidden">
			{/* Left Image Section */}
			<div className="hidden md:flex w-1/2 relative">
				<div className="absolute z-40 inset-0 flex items-start justify-start mx-10 pt-10 text-white text-4xl font-bold">
					<div
						className={`flex-shrink-0 text-2xl font-bold text-[#fff]`}
					>
						<span className="">Tradeet </span>
						Business
					</div>
				</div>
				<img
					src={'/analysis.jpg'}
					alt="slide"
					className="object-cover w-full h-full animate-slideFade transition-all duration-1000"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-40" />
				<div>
					<div className="absolute inset-0 flex items-end justify-start mx-10 pb-10 text-white text-4xl font-bold">
						{step === 1 &&
							'Tradeet helps you focus on what matters—your business.'}
						{step === 2 &&
							'No website? No problem. Tradeet gives you a digital storefront.'}
						{step === 3 &&
							'From WhatsApp to Web—manage everything in one place.'}
						{step === 4 &&
							'All-in-one business tools for African entrepreneurs.'}
					</div>
				</div>
			</div>

			{/* Right Form Section */}
			<div className="w-full md:w-1/2 bg-white md:flex md:items-center md:justify-center relative">
				<div className="relative z-10 p-6 w-full max-w-md mx-auto text-black">
					<div className="flex flex-col items-center mb-6">
						<img
							src={'/images/logo.png'}
							alt="slide"
							className="object-cover w-14 h-14 mb-3 md:w-20 md:h-20 animate-slideFade transition-all duration-1000"
						/>
						<h2 className="text-2xl font-bold text-center">
							Welcome to Tradeet{' '}
							<span className="text-[#05b204]">
								Business
							</span>
						</h2>
						<p>Let's get your business set up!</p>
					</div>

					{/* Step Indicator */}
					<div className="mb-6 text-center">
						<p className="text-sm font-semibold text-gray-500 mb-2">
							Step {step} of 4
						</p>
						<div className="w-full bg-gray-200 rounded-full h-2 mb-2">
							<div
								className="bg-green-500 h-2 rounded-full transition-all duration-300"
								style={{ width: `${(step / 4) * 100}%` }}
							></div>
						</div>
						<p className="text-md text-gray-700 font-medium">
							{step === 1 &&
								'Enter your WhatsApp phone number'}
							{step === 2 &&
								'Verify the code sent to your number'}
							{step === 3 &&
								'Upload your logo and enter business details'}
							{step === 4 && 'Create a secure password'}
						</p>
					</div>

					{step === 1 && (
						<div>
							<p className="text-md mb-3">
								We would send a verification code to this
								number to verify that the number is
								accurate.
							</p>
							<input
								className="w-full p-2 mb-5 border rounded text-black"
								placeholder="Phone Number"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
							{errors.phone && (
								<p className="text-red-500">
									{errors.phone}
								</p>
							)}
							<div className="flex flex-row gap-2">
								<button
									onClick={handleSendOTP}
									className="w-full bg-[#05b204] text-white py-2 rounded"
								>
									Send Code
								</button>
							</div>
						</div>
					)}

					{step === 2 && (
						<div>
							<input
								className="w-full p-2 mb-2 border rounded text-black"
								placeholder="Enter OTP"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
							/>
							{errors.otp && (
								<p className="text-red-500">{errors.otp}</p>
							)}
							<div className="flex flex-row gap-2">
								<button
									onClick={() => setStep(step - 1)}
									className="w-full text-gray-600 border border-gray-400 py-2 rounded hover:bg-gray-100 transition"
								>
									← Back
								</button>
								<button
									onClick={handleVerifyOTP}
									className="w-full bg-[#05b204] text-white py-2 rounded"
								>
									Verify
								</button>
							</div>
						</div>
					)}

					{step === 3 && (
						<div>
							<input
								type="file"
								onChange={handleFileChange}
								className="mb-2 text-white md:text-black"
							/>
							{preview && (
								<img src={preview} className="h-16 mb-2" />
							)}
							{errors.logo && (
								<p className="text-red-500">
									{errors.logo}
								</p>
							)}
							<input
								className="w-full p-2 mb-2 border rounded text-black"
								placeholder="Business Name"
								value={businessName}
								onChange={(e) =>
									setBusinessName(e.target.value)
								}
							/>
							{errors.businessName && (
								<p className="text-red-500">
									{errors.businessName}
								</p>
							)}
							<input
								className="w-full p-2 mb-2 border rounded text-black"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{errors.email && (
								<p className="text-red-500">
									{errors.email}
								</p>
							)}
							<div className="flex flex-row gap-2">
								<button
									onClick={() => setStep(step - 1)}
									className="w-full text-gray-600 border border-gray-400 py-2 rounded hover:bg-gray-100 transition"
								>
									← Back
								</button>
								<button
									onClick={() =>
										validateStep() && setStep(4)
									}
									className="w-full bg-[#05b204] text-white py-2 rounded"
								>
									Continue
								</button>
							</div>
						</div>
					)}

					{step === 4 && (
						<div>
							<input
								type="password"
								className="w-full p-2 mb-2 border rounded text-black"
								placeholder="Password"
								value={password}
								onChange={(e) =>
									setPassword(e.target.value)
								}
							/>
							{errors.password && (
								<p className="text-red-500">
									{errors.password}
								</p>
							)}
							<input
								type="password"
								className="w-full p-2 mb-2 border rounded text-black"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							/>
							{errors.confirmPassword && (
								<p className="text-red-500">
									{errors.confirmPassword}
								</p>
							)}
							<button
								onClick={handleFinalSubmit}
								className="w-full bg-[#05b204] text-white py-2 rounded"
							>
								Create Account
							</button>
						</div>
					)}
				</div>
				{/* Footer */}
				<div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400">
					&copy; {new Date().getFullYear()} Tradeet Vendhub
					Ltd. All rights reserved.
				</div>
			</div>
		</div>
	);
}
