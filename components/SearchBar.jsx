// Example SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from 'use-debounce'; // You'll need to install this: npm install use-debounce

const SearchBar = ({
	items,
	onSearch,
	storeData,
	placeholder = 'Search products...',
}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearchTerm] = useDebounce(
		searchTerm,
		500,
	); // Debounce for 500ms

	useEffect(() => {
		onSearch(debouncedSearchTerm);
	}, [debouncedSearchTerm, onSearch]);

	return (
		<div className="relative w-full rounded-full shadow-sm border border-gray-200 focus-within:border-gray-400 transition-colors duration-200">
			<input
				type="text"
				placeholder={placeholder}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="w-full pl-5 pr-12 py-3 rounded-full text-gray-700 focus:outline-none text-base"
			/>
			<FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
		</div>
	);
};

export default SearchBar;
