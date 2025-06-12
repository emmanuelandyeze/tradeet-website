import React from 'react';
import {
	Smartphone,
	Mail,
	Phone,
	MapPin,
	Facebook,
	Twitter,
	Instagram,
	MessageCircle,
	ExternalLink,
} from 'lucide-react';

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Main Footer Content */}
				<div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-br from-[#fcdbb8] to-[#065637] rounded-lg flex items-center justify-center">
								<Smartphone className="w-5 h-5 text-white" />
							</div>
							<span className="text-xl font-bold">
								Tradeet Business
							</span>
						</div>
						<p className="text-gray-400 leading-relaxed">
							Empowering African entrepreneurs with simple,
							powerful business management tools. Run your
							business from anywhere, anytime.
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-gray-400 hover:text-[#fcdbb8] transition-colors"
							>
								<Facebook className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-[#fcdbb8] transition-colors"
							>
								<Twitter className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-[#fcdbb8] transition-colors"
							>
								<Instagram className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-[#fcdbb8] transition-colors"
							>
								<MessageCircle className="w-5 h-5" />
							</a>
						</div>
					</div>

					{/* Product Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Product
						</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#features"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Features
								</a>
							</li>
							<li>
								<a
									href="#pricing"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Pricing
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Mobile App
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									API Documentation
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Integrations
								</a>
							</li>
						</ul>
					</div>

					{/* Support Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Support
						</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Help Center
								</a>
							</li>
							<li>
								<a
									href="#community"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Community
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Tutorials
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Contact Us
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									System Status
								</a>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Get in Touch
						</h3>
						<ul className="space-y-3">
							<li className="flex items-center space-x-3">
								<Mail className="w-4 h-4 text-[#fcdbb8]" />
								<a
									href="mailto:hello@tradeet.ng"
									className="text-gray-400 hover:text-white transition-colors"
								>
									hello@tradeet.ng
								</a>
							</li>
							<li className="flex items-center space-x-3">
								<Phone className="w-4 h-4 text-[#fcdbb8]" />
								<a
									href="tel:+2349012345678"
									className="text-gray-400 hover:text-white transition-colors"
								>
									+234 901 234 5678
								</a>
							</li>
							<li className="flex items-center space-x-3">
								<MessageCircle className="w-4 h-4 text-[#fcdbb8]" />
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									WhatsApp Support
								</a>
							</li>
							<li className="flex items-start space-x-3">
								<MapPin className="w-4 h-4 text-[#fcdbb8] mt-0.5" />
								<span className="text-gray-400">
									Lagos, Nigeria
									<br />
									Serving all of Africa
								</span>
							</li>
						</ul>
					</div>
				</div>

				{/* App Download Section */}
				<div className="py-8 border-t border-gray-800">
					<div className="text-center">
						<h3 className="text-xl font-semibold mb-4">
							Download Tradeet Business
						</h3>
						<p className="text-gray-400 mb-6">
							Available on all platforms. Start managing
							your business today.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-4">
							<a
								href="#"
								className="inline-flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors"
							>
								<div className="w-8 h-8 bg-gradient-to-br from-[#fcdbb8] to-[#065637] rounded flex items-center justify-center">
									<Smartphone className="w-4 h-4 text-white" />
								</div>
								<div className="text-left">
									<div className="text-xs text-gray-400">
										Get it on
									</div>
									<div className="font-semibold">
										Google Play
									</div>
								</div>
								<ExternalLink className="w-4 h-4 text-gray-400" />
							</a>

							<a
								href="#"
								className="inline-flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors"
							>
								<div className="w-8 h-8 bg-gradient-to-br from-[#fcdbb8] to-[#065637] rounded flex items-center justify-center">
									<Smartphone className="w-4 h-4 text-white" />
								</div>
								<div className="text-left">
									<div className="text-xs text-gray-400">
										Download on the
									</div>
									<div className="font-semibold">
										App Store
									</div>
								</div>
								<ExternalLink className="w-4 h-4 text-gray-400" />
							</a>
						</div>
					</div>
				</div>

				{/* Bottom Footer */}
				<div className="py-6 border-t border-gray-800">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<div className="text-gray-400 text-sm">
							© 2025 Tradeet Vendhub Limited. All rights reserved.
						</div>
						<div className="flex space-x-6">
							<a
								href="#"
								className="text-gray-400 hover:text-white text-sm transition-colors"
							>
								Privacy Policy
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white text-sm transition-colors"
							>
								Terms of Service
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white text-sm transition-colors"
							>
								Cookie Policy
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
