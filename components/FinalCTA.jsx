// components/FinalCTA.tsx
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Image from 'next/image';
import Footer from './Footer'; // Adjust the import path as necessary

const FinalCTA = () => {
    return (
			<div>
				<section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mt-20 px-4">
					{/* Background Image */}
					<Image
						src="/images/landing.jpg" // replace with your actual image path
						alt="Grow your business with Tradeet"
						layout="fill"
						objectFit="cover"
						className="z-0"
						priority
					/>

					{/* Overlay */}
					<div className="absolute inset-0 bg-black opacity-50 z-10"></div>

					{/* Content */}
					<div className="relative z-20 text-center text-white max-w-2xl px-4">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
							Ready to Take Your Business <br /> to the Next
							Level?
						</h2>
						<p className="text-md md:text-lg mb-8 font-light">
							Join hundreds of entrepreneurs using Tradeet
							to grow smarter, faster, and stronger.
						</p>
						<a
							href="https://play.google.com/store/apps/details?id=com.tradeet.vendor&hl=en"
							className="inline-flex items-center bg-[#00C853] hover:bg-[#009b3a] text-white font-semibold py-3 px-6 rounded-full text-lg transition-all duration-300"
						>
							Get Started — It's Free{' '}
							<BsArrowRight className="ml-3" size={20} />
						</a>
					</div>
				</section>
				<Footer />
			</div>
		);
};

export default FinalCTA;
