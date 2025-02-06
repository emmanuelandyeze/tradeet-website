import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import SectionOne from '@/components/SectionOne';
import SectionTwo from '@/components/SectionTwo';
import Image from 'next/image';

export default function Home() {
	return (
		<div>
			<Navbar />
			<HeroSection />
			<SectionOne />
			<div className="bg-[#2DCC70] bg-opacity-20">
				<SectionTwo />
			</div>
			<Footer />
		</div>
	);
}
