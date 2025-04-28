'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const isHomePage = pathname === '/';

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () =>
			window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav
			className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${
				isHomePage && !isScrolled
					? 'bg-transparent'
					: 'bg-white shadow-sm'
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div
						className={`flex-shrink-0 text-xl font-bold  ${
							isHomePage && !isScrolled
								? 'text-[#212121]'
								: 'text-[#212121]'
						}`}
					>
						<span className="text-[#05b204]">Tradeet </span>
						Business
					</div>

					<div className="hidden md:flex space-x-6">
						<a
							href="/"
							className={`text-gray-800 hover:text-blue-600 ${
								isHomePage && !isScrolled
									? 'text-[#212121]'
									: 'text-[#212121]'
							}`}
						>
							Home
						</a>
						<a
							href="/about"
							className={`text-gray-800 hover:text-blue-600 ${
								isHomePage && !isScrolled
									? 'text-[#212121]'
									: 'text-[#212121]'
							}`}
						>
							About
						</a>
						<a
							href="/services"
							className={`text-gray-800 hover:text-blue-600 ${
								isHomePage && !isScrolled
									? 'text-[#212121]'
									: 'text-[#212121]'
							}`}
						>
							Services
						</a>
						<a
							href="/contact"
							className={`text-gray-800 hover:text-blue-600 ${
								isHomePage && !isScrolled
									? 'text-[#212121]'
									: 'text-[#212121]'
							}`}
						>
							Contact
						</a>
					</div>

					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-gray-800"
						>
							{isOpen ? (
								<X
									className={`${
										isHomePage && !isScrolled
											? 'text-[#212121]'
											: 'text-[#212121]'
									}`}
									size={24}
								/>
							) : (
								<Menu
									className={`${
										isHomePage && !isScrolled
											? 'text-[#212121]'
											: 'text-[#212121]'
									}`}
									size={24}
								/>
							)}
						</button>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="md:hidden bg-white shadow-md py-4 px-6">
					<a
						href="/"
						className="block text-gray-800 py-2 hover:text-blue-600"
					>
						Home
					</a>
					<a
						href="/about"
						className="block text-gray-800 py-2 hover:text-blue-600"
					>
						About
					</a>
					<a
						href="/services"
						className="block text-gray-800 py-2 hover:text-blue-600"
					>
						Services
					</a>
					<a
						href="/contact"
						className="block text-gray-800 py-2 hover:text-blue-600"
					>
						Contact
					</a>
				</div>
			)}
		</nav>
	);
}
