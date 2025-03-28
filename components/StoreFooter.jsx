'use client';
import Link from 'next/link';
import React from 'react';

const StoreFooter = () => {
	return (
		<footer className="bg-white fixed bottom-0 w-full border-t mt-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex md:flex-row flex-col-reverse gap-3 justify-between items-center">
				<p className="text-gray-600 text-sm">
					&copy; {new Date().getFullYear()} Tradeet Vendhub Limited. All
					rights reserved.
				</p>
				<Link href="https://tradeet.ng">
					<p className="bg-[#121212] border text-sm md:text-md text-white py-2 px-4 rounded-md hover:bg-[#000] hover:text-white transition">
						Create Your Tradeet Store
					</p>
				</Link>
			</div>
		</footer>
	);
};

export default StoreFooter;
