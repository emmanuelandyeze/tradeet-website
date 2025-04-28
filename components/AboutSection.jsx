// components/AboutSection.tsx
import React from 'react';

const AboutSection = () => {
  return (
		<section
			className="w-full bg-white pt-10 pb-8 px-6 md:px-12"
			id="about"
		>
			<div className="max-w-5xl mx-auto text-center">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
					Why Tradeet Business?
				</h2>
				<div className='flex flex-col md:flex-row md:gap-10 items-center mt-5'>
					<p className="text-gray-700 text-lg md:text-xl text-left mb-10 leading-relaxed">
						Managing a business shouldn't be complicated or
						expensive. <br />
						<br />
						Tradeet business makes it simple by bringing everything
						you need — from inventory tracking to marketing
						automation — into one easy-to-use mobile app.{' '}
						<br />
						<br />
						Built specifically for African entrepreneurs,
						freelancers, and SMEs, Tradeet helps you stay
						organized, attract more customers, and grow
						sustainably — without needing expensive tools or
						technical skills.
					</p>

					<div className="flex flex-wrap justify-start gap-4">
						<div className="bg-green-100 text-green-800 px-5 py-3 rounded-full text-sm font-medium shadow-sm">
							✅ Mobile-first
						</div>
						<div className="bg-green-100 text-green-800 px-5 py-3 rounded-full text-sm font-medium shadow-sm">
							✅ Affordable for every business size
						</div>
						<div className="bg-green-100 text-green-800 px-5 py-3 rounded-full text-sm font-medium shadow-sm">
							✅ Built for African markets
						</div>
						<div className="bg-green-100 text-green-800 px-5 py-3 rounded-full text-sm font-medium shadow-sm">
							✅ No technical expertise needed
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
