import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

const HeroSection = () => {
	return (
		<section
			className="relative w-full h-[70vh] md:h-[90vh] bg-cover bg-center"
			style={{
				backgroundImage:
					'url("/images/landing.jpg")',
			}}
		>
			{/* Overlay */}
			<div className="absolute inset-0 bg-black opacity-70"></div>

			{/* Hero Content */}
			<div className="absolute inset-0 max-w-5xl mx-auto flex flex-col justify-center items-center pt-10 text-white text-center px-4">
				<h1 className="text-[2.7rem] leading-[3rem] md:leading-[5.5rem] inter-font md:text-7xl font-bold mb-8">
					<span className="text-[#FFB300] inter-font font-bold">
						Smart solutions
					</span>{' '}
					for your business{' '}
					<span className="text-[#00C853] font-bold">
						{' '}
						success.
					</span>{' '}
				</h1>
				<p className="text-md w-full md:max-w-3xl md:leading-[2.5rem] mx-auto md:text-2xl mb-10">
					Manage inventory, track finances, build your
					online presence, and market your brand, all in one
					place.
				</p>
				<a href='https://play.google.com/store/apps/details?id=com.tradeet.vendor&hl=en' className="bg-[#FFF] flex flex-row gap-2 items-center inter-font hover:bg-gray-50 text-[#121212] font-bold py-3 md:py-4 px-6 rounded-lg text-md md:text-xl">
					<span>Get started</span>
					<FaArrowRight />
				</a>
			</div>
		</section>
	);
};

export default HeroSection;
