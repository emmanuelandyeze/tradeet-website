import Image from 'next/image';
import React from 'react';
import { FaGlobe, FaBoxes, FaCreditCard, FaChartLine } from 'react-icons/fa';

const SectionOne = () => {
	 const features = [
		{
		  icon: <FaGlobe className="text-blue-600 text-4xl mb-4" />,
		  title: 'One-click Business Website',
		  description:
			'Quickly launch your professional page — no tech skills needed. Build trust, attract customers, and grow your brand online.',
		},
		{
		  icon: <FaBoxes className="text-green-600 text-4xl mb-4" />,
		  title: 'Inventory Management',
		  description:
			'Stay on top of your stock with simple inventory tracking built for busy entrepreneurs. Know what’s available, what’s running low, and manage your sales seamlessly from your phone.',
		},
		{
		  icon: <FaCreditCard className="text-purple-600 text-4xl mb-4" />,
		  title: 'Smart Finance Tools',
		  description:
			'Take control of your money with automated invoicing, expense tracking, and simple tax calculations. No more paperwork or messy spreadsheets.',
		},
		{
		  icon: <FaChartLine className="text-pink-600 text-4xl mb-4" />,
		  title: 'Marketing Automation',
		  description:
			'Reach your customers where they are — WhatsApp, email, and social media — with built-in marketing tools to grow your sales easily.',
		},
	  ];
	return (
		<div className=" bg-gray-100 mx-auto px-4  pt-10 pb-14 items-center">
			<div className="max-w-6xl mx-auto flex flex-col items-center">
				<h1 className="text-[1.8rem] md:w-[60%] md:leading-[3.5rem] md:text-5xl leading-[2.2rem] mt-4 font-bold text-[#17412D] text-center">
					Everything You Need to Succeed — In One Simple App{' '}
					{/* <span className="text-[#00C853]">
					Business Owners.
				</span> */}
				</h1>
				<p className="text-center text-[#73887F] text-[1rem] mt-5 md:w-[50%]">
					Tradeet brings all the essential tools your
					business needs into one easy-to-use, mobile-first
					platform — so you can focus on growth, not stress.
				</p>
				<div className="grid gap-8 grid-cols-1 md:grid-cols-2 mt-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="bg-transparent border-[1px] border-[#17412D] p-6 rounded-lg transition"
						>
							{feature.icon}
							<h3 className="text-xl font-semibold mb-2">
								{feature.title}
							</h3>
							<p className="text-gray-600">
								{feature.description}
							</p>
						</div>
					))}
				</div>
				<div className="mt-10 flex flex-col items-center">
					<p className="text-lg font-semibold text-center text-gray-700 mb-4">
						All the essential tools you need — beautifully
						designed, mobile-first, and made for African
						entrepreneurs.
					</p>
					<a
						href="https://play.google.com/store/apps/details?id=com.tradeet.vendor&hl=en"
						className="mt-4 px-6 py-3 bg-[#05b204] text-white font-semibold rounded-full hover:bg-[#04b204e7] transition"
					>
						Get Started Free
					</a>
				</div>
			</div>
		</div>
	);
};

export default SectionOne;
