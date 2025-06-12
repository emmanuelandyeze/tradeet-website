import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import SectionOne from '@/components/SectionOne';
import SectionTwo from '@/components/SectionTwo';
import AboutSection from '@/components/AboutSection';
import FaqSection from '@/components/FaqSection';
import FinalCTA from '@/components/FinalCTA';
import Header from '@/components/Header';
import ProblemSolution from '@/components/ProblemSolution';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Community from '@/components/Community';
import Pricing from '@/components/Pricing';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
	return (
		<div>
			<Header />
			<HeroSection />

			<ProblemSolution />
			<Features />
			<HowItWorks />
			<Community />
			<Pricing />
			<Faq />
			<FinalCTA />
			<Footer />
		</div>
	);
}
