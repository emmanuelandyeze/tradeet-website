'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, Smartphone } from 'lucide-react';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () =>
			window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-white/95 backdrop-blur-md shadow-lg'
					: 'bg-transparent'
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex items-center space-x-2">
						<div className="w-14 h-14 rounded-lg flex items-center justify-center">
							<img src="./images/logo.png" />
						</div>
						<span className="text-xl font-bold text-[#065637]">
							Tradeet Business
						</span>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<a
							href="#features"
							className="text-gray-700 hover:text-[#065637] transition-colors"
						>
							Features
						</a>
						<a
							href="#pricing"
							className="text-gray-700 hover:text-[#065637] transition-colors"
						>
							Pricing
						</a>
						<a
							href="#community"
							className="text-gray-700 hover:text-[#065637] transition-colors"
						>
							Community
						</a>
						<a
							href="#faq"
							className="text-gray-700 hover:text-[#065637] transition-colors"
						>
							FAQ
						</a>
					</nav>

					{/* CTA Buttons */}
					<div className="hidden md:flex items-center space-x-4">
						{/* <button className="text-[#065637] hover:text-[#065637]/80 font-medium transition-colors">
							Sign In
						</button> */}
						<a
							href="https://play.google.com/store/apps/details?id=com.tradeet.vendor&hl=en&pli=1"
							className="bg-[#065637] text-white px-4 py-2 rounded-lg hover:bg-[#065637]/90 transition-all transform hover:scale-105"
						>
							Get Started Free
						</a>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden"
					>
						{isMenuOpen ? (
							<X className="w-6 h-6 text-gray-700" />
						) : (
							<Menu className="w-6 h-6 text-gray-700" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden bg-white border-t border-gray-200">
						<div className="px-2 pt-2 pb-3 space-y-1">
							<a
								href="#features"
								className="block px-3 py-2 text-gray-700 hover:text-[#065637]"
							>
								Features
							</a>
							<a
								href="#pricing"
								className="block px-3 py-2 text-gray-700 hover:text-[#065637]"
							>
								Pricing
							</a>
							<a
								href="#community"
								className="block px-3 py-2 text-gray-700 hover:text-[#065637]"
							>
								Community
							</a>
							<a
								href="#faq"
								className="block px-3 py-2 text-gray-700 hover:text-[#065637]"
							>
								FAQ
							</a>
							<div className="border-t border-gray-200 pt-3 mt-3">
								<button className="block w-full text-left px-3 py-2 text-[#065637] font-medium">
									Sign In
								</button>
								<button className="block w-full mt-2 bg-[#065637] text-white px-3 py-2 rounded-lg">
									Get Started Free
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
