import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

const HeroSection = () => {
	return (
		<section
			className="max-w-6xl mx-auto h-[90vh] pt-20 flex flex-col overflow-hidden items-center md:h-[100vh] bg-cover bg-center"
			// style={{
			// 	backgroundImage:
			// 		'url("/images/mockup.png")',
			// }}
		>
			{/* Overlay
			<div className="absolute inset-0 bg-black opacity-0"></div> */}

			{/* Hero Content */}
			<div className=" flex flex-col justify-center items-center pt-10 text-[#212121] text-center px-4">
				<h1 className="text-[2.7rem] leading-[3.2rem] md:leading-[4.3rem] text-center md:text-[3.7rem] mb-5">
					<span className="text-[#05b204] font-bold">
						One Platform
					</span>{' '}
					to Manage Your Entire Business{' '}
				</h1>
				<p className="text-md w-full md:max-w-3xl text-center md:leading-[2.5rem] mx-auto md:text-2xl mb-5">
					Manage inventory, track finances, build your
					online presence, and market your brand, all in one
					place.
				</p>
				<a
					href="/dashboard/signup"
					className="bg-[#05b204] flex flex-row gap-2 items-center inter-font hover:bg-[#04b204e7] text-[#121212] font-bold py-3 md:py-4 px-6 rounded-lg text-md md:text-xl"
				>
					<span className="text-white">Start for free</span>
					<FaArrowRight color="#fff" />
				</a>
			</div>
			<div>
				<img
					src="/images/mockup2.png"
					alt="Mockup"
					className=" w-[18rem] md:hidden h-[18rem] mt-8 md:w-[40rem] md:h-[40rem] object-contain"
				/>
				<img
					src="/images/mockup2.png"
					alt="Mockup"
					className=" w-[18rem] hidden md:block h-[18rem] mt-8 md:w-[20rem] md:h-[20rem] object-contain"
				/>
			</div>
		</section>
	);
};

export default HeroSection;
