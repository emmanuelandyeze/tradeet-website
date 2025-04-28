// components/Footer.tsx
import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { BsArrowUpRightCircle } from 'react-icons/bs';
import Image from 'next/image';

const Footer = () => {
	return (
		<footer className="bg-[#0B2612] text-white py-12 px-6 mt-0">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
				{/* Logo and Short Description */}
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<Image
							src="/images/logo.png" // replace with your white logo if available
							alt="Tradeet Logo"
							width={40}
							height={40}
						/>
						<p className="font-bold text-2xl">
							Tradeet Business
						</p>
					</div>
					<p className="text-sm text-gray-300 leading-relaxed">
						Empowering African entrepreneurs with the tools
						they need to grow, sell, and thrive — all from
						their phones.
					</p>
				</div>

				{/* Quick Links */}
				<div>
					<h4 className="text-lg font-semibold mb-4">
						Quick Links
					</h4>
					<ul className="flex flex-col gap-3 text-gray-300 text-sm">
						<li>
							<a href="/" className="hover:text-white">
								Home
							</a>
						</li>
						<li>
							<a
								href="#features"
								className="hover:text-white"
							>
								Features
							</a>
						</li>
						<li>
							<a
								href="#pricing"
								className="hover:text-white"
							>
								Pricing
							</a>
						</li>
						<li>
							<a href="#faq" className="hover:text-white">
								FAQ
							</a>
						</li>
						<li>
							<a
								href="#download"
								className="hover:text-white"
							>
								Download App
							</a>
						</li>
						<li>
							<a
								href="#contact"
								className="hover:text-white"
							>
								Contact
							</a>
						</li>
					</ul>
				</div>

				{/* Social Links */}
				<div>
					<h4 className="text-lg font-semibold mb-4">
						Connect With Us
					</h4>
					<div className="flex gap-4">
						<a
							href="https://instagram.com/tradeetbusiness" // update with your real link
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-[#00C853] transition-colors"
						>
							<FaInstagram size={24} />
						</a>
						<a
							href="https://www.linkedin.com/company/tradeet-nigeria" // update with your real link
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-[#00C853] transition-colors"
						>
							<FaLinkedin size={24} />
						</a>
					</div>
				</div>

				{/* Download App */}
				<div>
					<h4 className="text-lg font-semibold mb-4">
						Get the App
					</h4>
					<a
						href="https://play.google.com/store/apps/details?id=com.tradeet.vendor&hl=en"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 bg-[#00C853] hover:bg-[#009b3a] text-white font-semibold py-3 px-5 rounded-full text-sm transition-all duration-300"
					>
						Download on Playstore
						<BsArrowUpRightCircle size={20} />
					</a>
				</div>
			</div>

			{/* Bottom Copyright */}
			<div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
				&copy; {new Date().getFullYear()} Tradeet Vendhub
				Ltd. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
