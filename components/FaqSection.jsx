// components/FaqSection.tsx
'use client';

import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const faqs = [
	{
		question: 'What is Tradeet and who is it for?',
		answer: 'Tradeet is a mobile-first business management app built for African entrepreneurs, freelancers, and small business owners. It helps you sell smarter, track your inventory, promote your products, and grow your business without needing expensive tools or technical skills.',
	},
	{
		question: 'Is Tradeet free to use?',
		answer: 'Yes! You can get started for free. Tradeet offers affordable plans designed for different business sizes, with optional paid features if you want to scale faster.',
	},
	{
		question: 'Do I need technical skills to use Tradeet?',
		answer: 'Not at all. Tradeet is designed to be user-friendly — everything from setting up your store to marketing your products can be done easily without needing coding or advanced tech knowledge.',
	},
	{
		question: 'How does Tradeet help me find customers?',
		answer: 'Tradeet connects you with nearby customers using geolocation, lets you promote products beyond your contact list, and provides marketing tools and insights to help you reach a wider audience.',
	},
	{
		question: 'Can I run my entire business on Tradeet?',
		answer: 'Yes, you can manage products, track orders, communicate with customers, run promotions, and analyze your business performance — all within the app.',
	},
];

const FaqSection = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleFAQ = (index) => {
		if (openIndex === index) {
			setOpenIndex(null);
		} else {
			setOpenIndex(index);
		}
	};

	return (
		<section className="max-w-5xl mx-auto my-20 px-6">
			<div className="text-center mb-12">
				<h2 className="text-[#17412D] text-4xl md:text-5xl font-bold mb-4">
					Frequently Asked Questions
				</h2>
				<p className="text-gray-600 text-md md:text-lg">
					Everything you need to know about getting started with Tradeet.
				</p>
			</div>

			<div className="flex flex-col gap-6">
				{faqs.map((faq, index) => (
					<div
						key={index}
						className="bg-white rounded-[20px] shadow-md px-6 py-5 cursor-pointer transition-all duration-300"
						onClick={() => toggleFAQ(index)}
					>
						<div className="flex items-center justify-between">
							<h3 className="text-[#17412D] font-semibold text-lg">{faq.question}</h3>
							{openIndex === index ? (
								<BsChevronUp size={20} color="#17412D" />
							) : (
								<BsChevronDown size={20} color="#17412D" />
							)}
						</div>
						{openIndex === index && (
							<p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
						)}
					</div>
				))}
			</div>
		</section>
	);
};

export default FaqSection;
