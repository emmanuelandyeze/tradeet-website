import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import SectionOne from '@/components/SectionOne';
import SectionTwo from '@/components/SectionTwo';
import AboutSection from '@/components/AboutSection';
import FaqSection from '@/components/FaqSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
	return (
		<div>
			<Navbar />
			<HeroSection />

			<SectionOne />
			<AboutSection />
			<div className="bg-[#2DCC70] bg-opacity-20">
				<SectionTwo />
			</div>
			<FaqSection />
			<FinalCTA />
			{/* <Footer /> */}
		</div>
	);
}
