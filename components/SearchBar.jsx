'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ items, onSearch, storeData }) => {
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const filteredItems = items?.filter(
			(item) =>
				item.name
					.toLowerCase()
					.includes(searchTerm?.toLowerCase()) ||
				item.description
					.toLowerCase()
					.includes(searchTerm?.toLowerCase()),
		);
		onSearch(filteredItems);
	}, [searchTerm, items, onSearch]);

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className="flex justify-center mb-8">
			<input
				type="text"
				value={searchTerm}
				onChange={handleInputChange}
				className="border py-4 px-3 rounded-l-lg focus:border-[1px] focus:border-gray-100 w-full md:w-2/3"
				placeholder="Search for products..."
			/>
			<button
				onClick={() => onSearch(filteredItems)}
				style={{ backgroundColor: storeData?.themeColor || '#000' }}
				className="text-white p-4 rounded-r-lg"
			>
				<FaSearch size={24} />
			</button>
		</div>
	);
};

export default SearchBar;
