import Image from 'next/image';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BsArrowRightCircleFill } from 'react-icons/bs';

const SectionOne = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 flex flex-col pt-10 items-center">
			<p className="text-[#005D0F] lora-font font-[600]">
				Why Tradeet?
			</p>
			<h1 className="text-[2.1rem] md:w-[50%] md:leading-[3.5rem] md:text-5xl  leading-[2.5rem] mt-4 font-bold text-[#17412D] text-center">
				The Ultimate Toolkit for{' '}
				<span className="text-[#00C853]">
					Business Owners.
				</span>
			</h1>
			<p className="text-center text-[#73887F] text-lg mt-5 md:w-[50%]">
				Running a business is hard; reaching your customers
				should not be. Tradeet brings together the tools you
				need to build, market, and deliver seamlessly- so
				you can focus on what matters most.
			</p>
			<div className="flex flex-col-reverse md:flex-row justify-between w-full items-center mt-10 md:mt-10 gap-10">
				<div className="gap-2 flex-col flex w-full md:w-[50%]">
					<p className="text-[#005D0F] font-[500]">
						Build your Online Presence
					</p>
					<h1 className="text-[#17412D] font-[700] text-3xl md:text-[2.5rem] md:leading-[3rem]">
						Say Goodbye to Endless <br /> DM Conversations
					</h1>
					<p className="text-[#121212] font-[500] text-lg">
						With{' '}
						<span className="text-[#00C853] italic">
							Tradeet Business
						</span>
						, you can create a website that showcases
						products, handles payments and streamlines
						operations - no coding needed.
					</p>
					<div>
						<a
							href="https://play.google.com/store/apps/details?id=com.tradeet.vendor&hl=en"
							className="bg-[#17412D] hover:bg-[#17412D] flex flex-row items-center gap-3 text-white py-2 px-4 mt-8 rounded-[20px] text-md"
						>
							<p>Launch your business</p>
							<BsArrowRightCircleFill size={24} />
						</a>
					</div>
				</div>
				<div className="bg-[#F7FCE7] flex flex-row md:h-[50vh] h-[40vh] rounded-[20px] items-center px-0 w-full md:w-[70%] my-0">
					<div className="z-20 relative flex flex-col items-center gap-2 top-16 left-12 md:-top-6 md:left-10">
						<div className="flex flex-row items-center justify-between p-2 gap-2 w-[115%] rounded-[10px] bg-white">
							<div className="flex flex-row gap-1 items-center">
								<p className="text-xl">📦</p>
								<div className="flex flex-col">
									<p className="text-[.65rem] md:text-[1.2rem] font-semibold">
										Seamless Expansion Made Easy
									</p>
									<p className="text-[.65rem] md:text-[.6rem] font-normal">
										Add unlimited products and categories
									</p>
								</div>
							</div>
							<BsThreeDotsVertical />
						</div>
						<div className="flex flex-row items-center justify-between p-2 gap-2 w-[105%] rounded-[10px] bg-white">
							<div className="flex flex-row gap-1 items-center">
								<p className="text-xl">📈</p>
								<div className="flex flex-col">
									<p className="text-[.65rem] md:text-[1rem] font-semibold">
										Anaytics at your call
									</p>
									<p className="text-[.5rem] md:text-[.6rem] font-normal">
										Get business analytics, anyday, anytime.
									</p>
								</div>
							</div>
							<BsThreeDotsVertical />
						</div>
						<div className="flex flex-row items-center justify-between p-2 gap-2 w-[100%] rounded-[10px] bg-white">
							<div className="flex flex-row gap-1 items-center">
								<p className="text-xl">🧾</p>
								<div className="flex flex-col">
									<p className="text-[.65rem] md:text-[1rem] font-semibold">
										Automated confirmation
									</p>
									<p className="text-[.5rem] md:text-[.6rem] font-normal">
										Automate order confirmation and
										receipts.
									</p>
								</div>
							</div>
							<BsThreeDotsVertical />
						</div>
					</div>
					<img
						src="/images/woman.png"
						alt="Picture of a woman"
						className="pr-0 -right-0 md:right-32 overflow-hidden object-cover absolute w-[90%] h-[20rem] md:w-[38rem] md:h-[31rem] mt-4 md:mt-0"
					/>
				</div>
			</div>
		</div>
	);
};

export default SectionOne;
