import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

const HeroSection = () => {
	return (
		<section
			className="relative w-full h-[70vh] md:h-[90vh] bg-cover bg-center"
			style={{
				backgroundImage:
					'url("https://s3-alpha-sig.figma.com/img/e68c/bdb4/2457b9483b7afd9e500886f86324eeed?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Xe05XIniUgZU1eAxQ2T7SVBdrYqpn3pFfd~h4n76WdNWfTcVSeFd6GijgZVtnAElOJLwc-zWHK689Uex50xizA2SadPvkP7FaOl3D1rv6UtT9unqPdgCRUVvT11yrOSw3AFaxcLyJh9A~eBUC~FHderajIIRCj-lZgBcer21AVolb5D9wRdkO-wtlJVaJoxDoPIDVFLdyP~E1ma3Zl~Fg168OSYLZUP-UXarnd68wSzsubxJwM7I6x48-aO~~mCgYwQTNsv3mqKHhbT7fppHe9mnds1hdn1ID9PzrMECblHKZo3U~Tx171hm98NKn-U460se8XWoAI77W9GwiKJcAg__")',
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
				<button className="bg-[#FFF] flex flex-row gap-2 items-center inter-font hover:bg-gray-50 text-[#121212] font-bold py-3 md:py-4 px-6 rounded-lg text-md md:text-xl">
					<span>Get started</span>
					<FaArrowRight />
				</button>
			</div>
		</section>
	);
};

export default HeroSection;
