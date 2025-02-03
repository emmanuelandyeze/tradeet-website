import React from 'react'

const SectionOne = () => {
  return (
		<div className="max-w-7xl mx-auto h-[70vh] px-4 flex flex-col pt-10 items-center">
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
		</div>
	);
}

export default SectionOne