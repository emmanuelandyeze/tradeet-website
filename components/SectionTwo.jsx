// components/SectionTwo.tsx
import Image from 'next/image';
import React from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { GiDiamonds } from 'react-icons/gi';

const SectionTwo = () => {
	return (
		<section className="flex flex-col py-14 md:flex-row max-w-7xl mx-auto gap-8 my-5 px-6">
			{/* Card 1 */}
			<div className="flex-1 bg-white rounded-[20px] shadow-md px-8 py-10 flex flex-col justify-between">
				<div>
					<p className="text-[#00A651] font-semibold uppercase tracking-wide mb-2">
						Get Discovered
					</p>
					<h2 className="text-[#17412D] text-3xl md:text-4xl font-bold mb-6">
						Don't Wait for Sales, <br /> Create Them
					</h2>
					<div className="flex flex-col gap-5">
						<div className="flex items-start gap-3">
							<GiDiamonds color="#00C853" size={32} />
							<p className="text-gray-700">
								Promote your products beyond your immediate
								contacts and grow faster.
							</p>
						</div>
						<div className="flex items-start gap-3">
							<GiDiamonds color="#00C853" size={32} />
							<p className="text-gray-700">
								Access detailed insights on your marketing
								performance — so you can optimize smartly.
							</p>
						</div>
						<div className="flex items-start gap-3">
							<GiDiamonds color="#00C853" size={32} />
							<p className="text-gray-700">
								Maximize seasonal promotions like
								Valentine’s, Black Friday, and festive
								sales.
							</p>
						</div>
					</div>

					<a
						href="https://play.google.com/store/apps/details?id=com.tradeet.vendor&hl=en"
						target="_blank"
						className="inline-flex items-center gap-3 bg-[#17412D] text-white hover:bg-[#0e291c] py-3 px-6 rounded-[30px] text-md font-medium mt-8 transition"
					>
						Launch Your Business
						<BsArrowRightCircleFill size={24} />
					</a>
				</div>

				{/* <div className="mt-10">
					<Image
						src="/card.jpg"
						alt="Grow your business"
						className="rounded-[20px] object-cover"
						width={600}
						height={400}
					/>
				</div> */}
			</div>

			{/* Card 2 */}
			<div className="flex-1 bg-white rounded-[20px] shadow-md px-8 py-10 flex flex-col justify-between">
				<div>
					<p className="text-[#00A651] font-semibold uppercase tracking-wide mb-2">
						Own Your Local Market
					</p>
					<h2 className="text-[#17412D] text-3xl md:text-4xl font-bold mb-6">
						Sell Smarter, <br /> Not Harder
					</h2>
					<div className="flex flex-col gap-5">
						<div className="flex items-start gap-3">
							<GiDiamonds color="#00C853" size={32} />
							<p className="text-gray-700">
								Geolocation tools connect nearby customers
								directly to your storefront.
							</p>
						</div>
						<div className="flex items-start gap-3">
							<GiDiamonds color="#00C853" size={32} />
							<p className="text-gray-700">
								Curated local deals make it easy to stand
								out and attract foot traffic.
							</p>
						</div>
						<div className="flex items-start gap-3">
							<GiDiamonds color="#00C853" size={32} />
							<p className="text-gray-700">
								Stay competitive with constant visibility in
								your local business community.
							</p>
						</div>
					</div>

					<a
						href="https://play.google.com/store/apps/details?id=com.tradeet.vendor&hl=en"
						target="_blank"
						className="inline-flex items-center gap-3 bg-[#00C853] text-white hover:bg-[#009f45] py-3 px-6 rounded-[30px] text-md font-medium mt-8 transition"
					>
						Launch Your Business
						<BsArrowRightCircleFill size={24} />
					</a>
				</div>

				{/* <div className="mt-10">
					<Image
						src="/analysis.jpg"
						alt="Local business success"
						className="rounded-[20px] object-cover"
						width={600}
						height={400}
					/>
				</div> */}
			</div>
		</section>
	);
};

export default SectionTwo;
