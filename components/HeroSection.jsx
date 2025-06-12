'use client'
import React, { useEffect, useState } from 'react';
import {
	ArrowRight,
	Play,
	Users,
	Store,
	Shield,
	Zap,
	Heart,
} from 'lucide-react';
import { FaPeopleGroup } from 'react-icons/fa6';

const Hero = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#fcdbb8]/20 via-white to-[#065637]/5">
			{/* Animated Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-20 left-10 w-20 h-20 bg-[#fcdbb8]/30 rounded-full animate-pulse"></div>
				<div className="absolute top-40 right-20 w-16 h-16 bg-[#065637]/20 rounded-full animate-bounce delay-300"></div>
				<div className="absolute bottom-40 left-20 w-12 h-12 bg-[#fcdbb8]/40 rounded-full animate-pulse delay-700"></div>
				<div className="absolute bottom-20 right-40 w-24 h-24 bg-[#065637]/10 rounded-full animate-bounce delay-1000"></div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
				<div className="grid lg:grid-cols-2 gap-24 items-center">
					{/* Left Content */}
					<div
						className={`space-y-8 transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						<div className="space-y-4">
							<div className="inline-flex items-center space-x-2 bg-[#fcdbb8]/20 rounded-full px-4 py-2 text-sm font-medium text-[#065637]">
								<Heart className="w-4 h-4" />
								<span>Loved by African Entrepreneurs</span>
							</div>

							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
								Run Your Business
								<span className="text-[#065637] block">
									from Anywhere
								</span>
							</h1>

							<p className="text-xl text-gray-600 leading-relaxed max-w-xl">
								Sell online, manage inventory, track income,
								and grow your business—all from your phone.
								Perfect for small businesses and
								entrepreneurs across Africa.
							</p>
						</div>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4">
							<a
								href="https://play.google.com/store/apps/details?id=com.tradeet.vendor&hl=en&pli=1"
								className="group bg-[#065637] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#065637]/90 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
							>
								<span>Get the App Free</span>
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</a>

							<a
								href="https://chat.whatsapp.com/Du8xWBkUB8d66fuq0Qd7ul"
								className="group border-2 border-[#065637] text-[#065637] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#065637] hover:text-white transition-all flex items-center justify-center space-x-2"
							>
								<Users className="w-5 h-5" />
								<span>Join the Community</span>
							</a>
						</div>

						{/* Trust Indicators */}
						<div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
							<div className="text-center">
								<div className="flex items-center justify-center mb-2">
									<Shield className="w-6 h-6 text-[#065637]" />
								</div>
								<div className="text-sm text-gray-600">
									Bank-Level Security
								</div>
							</div>
							<div className="text-center">
								<div className="flex items-center justify-center mb-2">
									<Zap className="w-6 h-6 text-[#065637]" />
								</div>
								<div className="text-sm text-gray-600">
									Setup in Minutes
								</div>
							</div>
							<div className="text-center">
								<div className="flex items-center justify-center mb-2">
									<Users className="w-6 h-6 text-[#065637]" />
								</div>
								<div className="text-sm text-gray-600">
									Growing Community
								</div>
							</div>
						</div>
					</div>

					{/* Right Content - Animated Phone Mockup */}
					<div
						className={`relative transition-all duration-1000 delay-300 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						<div className="relative mx-auto max-w-sm">
							{/* Phone Frame */}
							{/* <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
								<div className="bg-white rounded-[2rem] overflow-hidden">
									
									<div className="bg-gray-50 px-6 py-2 flex justify-between items-center text-xs">
										<span className="font-medium">
											9:41
										</span>
										<div className="flex space-x-1">
											<div className="w-4 h-2 bg-green-500 rounded-sm"></div>
											<div className="w-4 h-2 bg-green-500 rounded-sm"></div>
											<div className="w-4 h-2 bg-green-500 rounded-sm"></div>
										</div>
									</div>

								
									<div className="p-6 space-y-4">
										
										<div className="flex items-center justify-between">
											<div>
												<h3 className="font-bold text-gray-900">
													Good morning, Sarah!
												</h3>
												<p className="text-sm text-gray-600">
													Your store is active
												</p>
											</div>
											<div className="w-10 h-10 bg-[#fcdbb8] rounded-full flex items-center justify-center">
												<Store className="w-5 h-5 text-[#065637]" />
											</div>
										</div>

										
										<div className="grid grid-cols-2 gap-3">
											<div className="bg-[#065637] text-white p-4 rounded-lg">
												<div className="text-sm opacity-90">
													Today's Sales
												</div>
												<div className="text-xl font-bold">
													₦45,200
												</div>
											</div>
											<div className="bg-[#fcdbb8] p-4 rounded-lg">
												<div className="text-sm text-[#065637]">
													Orders
												</div>
												<div className="text-xl font-bold text-[#065637]">
													12
												</div>
											</div>
										</div>

										
										<div className="space-y-3">
											<h4 className="font-semibold text-gray-900">
												Recent Orders
											</h4>
											<div className="space-y-2">
												<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
													<div>
														<div className="font-medium text-sm">
															Hair Extensions
														</div>
														<div className="text-xs text-gray-600">
															2 mins ago
														</div>
													</div>
													<div className="text-sm font-bold text-green-600">
														₦15,000
													</div>
												</div>
												<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
													<div>
														<div className="font-medium text-sm">
															Wedding Makeup
														</div>
														<div className="text-xs text-gray-600">
															1 hour ago
														</div>
													</div>
													<div className="text-sm font-bold text-green-600">
														₦25,000
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div> */}
							<img
								src="/images/mockup3.png"
								alt="Phone Mockup"
								className="w-[70%] h-auto"
							/>

							{/* Floating Elements */}
							<div className="absolute top-32 -left-10 bg-green-500 text-white p-2 rounded-lg shadow-lg animate-bounce">
								<div className="text-xs font-medium">
									+₦5,000
								</div>
							</div>
							<div className="absolute bottom-60 right-14 bg-blue-500 text-white p-2 rounded-lg shadow-lg animate-pulse">
								<div className="text-xs font-medium">
									New Order!
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
