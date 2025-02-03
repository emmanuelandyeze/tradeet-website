import HeroSection from '@/components/HeroSection';
import SectionOne from '@/components/SectionOne';
import SectionTwo from '@/components/SectionTwo';
import Image from 'next/image';

export default function Home() {
	return (
		<div>
			<HeroSection />
			<SectionOne />
			<div className="bg-[#2DCC70] bg-opacity-20">
				<SectionTwo />
			</div>
		</div>
	);
}
