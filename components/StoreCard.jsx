// components/StoreCard.js

import Link from 'next/link';
import React from 'react';

const StoreCard = () => {
	return (
		<div className="flex flex-col items-center justify-center p-6 h-[50vh] bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-semibold mb-4 text-gray-800">
				Sorry, this store is not yet on our platform.
			</h2>
			<Link
				href={'/signup'}
				className="px-4 py-2 bg-[#25D366] text-white font-semibold rounded hover:bg-[#25D366]"
			>
				Add your store now
			</Link>
		</div>
	);
};

export default StoreCard;
