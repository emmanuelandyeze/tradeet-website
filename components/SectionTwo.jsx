import Image from 'next/image';
import React from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { GiDiamonds } from 'react-icons/gi';

const SectionTwo = () => {
	return (
		<div className="flex flex-col md:flex-row max-w-7xl mx-auto md:gap-5 my-10 px-4 py-10">
			<div className="bg-white rounded-[20px] px-6 py-8">
				<p className="text-[#005d0f] font-[500]">
					Get Customers to find you
				</p>
				<h1 className="text-[#17412D] font-[700] text-3xl lora-font mt-3">
					Don't wait for sales, <br /> Create them
				</h1>
				<div className="flex flex-col gap-5 mt-8">
					<div className="flex flex-row gap-2 items-start">
						<GiDiamonds color="#00C853" size={40} />
						<p>
							Promote your products to new audience beyond
							your contacts
						</p>
					</div>
					<div className="flex flex-row gap-2 items-start">
						<GiDiamonds color="#00C853" size={30} />
						<p>
							Get detailed insights in marketing performance
						</p>
					</div>
					<div className="flex flex-row gap-2 items-start">
						<GiDiamonds color="#00C853" size={30} />
						<p>
							Maximize Valentine sales and seasonal
							promotions
						</p>
					</div>
				</div>
				<div>
					<button className="bg-[#17412D] hover:bg-[#17412D] flex flex-row items-center gap-3 text-white py-2 px-4 mt-8 rounded-[20px] text-md">
						<p>Launch your business</p>
						<BsArrowRightCircleFill size={24} />
					</button>
				</div>
				<div className="mt-10 w-[100%]">
					<img
						src={'/card.jpg'}
						className="rounded-[20px] h-[30vh] w-[100%] object-cover"
					/>
				</div>
			</div>
			<div className="bg-white rounded-[20px] px-6 py-8">
				<p className="text-[#005d0f] font-[500]">
					Reach your Local Market
				</p>
				<h1 className="text-[#17412D] font-[700] text-3xl lora-font mt-3">
					Sell Smarter, <br /> Not Harder
				</h1>
				<div className="flex flex-col gap-5 mt-8">
					<div className="flex flex-row gap-2 items-start">
						<GiDiamonds color="#005d0f" size={40} />
						<p>
							Geolocation connects local buyers to your store without hassle
						</p>
					</div>
					<div className="flex flex-row gap-2 items-start">
						<GiDiamonds color="#005d0f" size={25} />
						<p>
							Curated deals attract customers
						</p>
					</div>
					<div className="flex flex-row gap-2 items-start">
						<GiDiamonds color="#005d0f" size={40} />
						<p>
							Maintain a steady stream of sales even in a competitive market
						</p>
					</div>
				</div>
				<div>
					<button className="bg-[#00C853] hover:bg-[#17412D] flex flex-row items-center gap-3 text-white py-2 px-4 mt-8 rounded-[20px] text-md">
						<p>Launch your business</p>
						<BsArrowRightCircleFill size={24} />
					</button>
				</div>
				<div className="mt-10 w-[100%]">
					<Image
						src={'/analysis.jpg'}
						className="rounded-[20px] h-[30vh] w-[100%] object-cover"
						width={500}
						height={300}
					/>
				</div>
			</div>
		</div>
	);
};

export default SectionTwo;
