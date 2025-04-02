'use client';

import StoreCard from '@/components/StoreCard';
import StoreNavbar from '@/components/StoreNav';
import SearchBar from '@/components/SearchBar';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { RotatingSquare } from 'react-loader-spinner';
import {
	FaBagShopping,
	FaChevronDown,
	FaChevronUp,
	FaSearch,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import StoreFooter from '@/components/StoreFooter';
import { GiHotMeal } from 'react-icons/gi';
import axiosClient from '@/utils/axios';
import ProductCard from '@/components/ProductCard';
import { FaAngleRight } from 'react-icons/fa';
import SearchModal from '@/components/SearchModal';

const StoreCategory = ({
	storeData,
	storeProductsData,
	slug,
}) => {
	const productsData = storeProductsData;
	const [error, setError] = useState(null);
	const [allProducts, setAllProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState(
		[],
	);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] =
		useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] =
		useState(false);
	const [isSearchModalOpen, setIsSearchModalOpen] =
		useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const [cart, setCart] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setAllProducts(productsData || []);
		setFilteredProducts(productsData || []);
		setIsLoading(false);
	}, [productsData]);

	const handleSearch = useCallback(
		(query) => {
			setSearchQuery(query);
			if (!query) {
				// If search is empty, show all products in current category
				if (selectedCategory?.slug === 'all') {
					setFilteredProducts(allProducts);
				} else {
					setFilteredProducts(
						allProducts.filter(
							(product) =>
								product.category?.slug ===
								selectedCategory?.slug,
						),
					);
				}
				return;
			}

			const results = allProducts.filter(
				(product) =>
					product.name
						.toLowerCase()
						.includes(query.toLowerCase()) ||
					product.description
						?.toLowerCase()
						.includes(query.toLowerCase()),
			);
			setFilteredProducts(results);
		},
		[allProducts, selectedCategory],
	);

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await axiosClient.get(
					`/category/${storeData?._id}`,
				);
				setCategories(response.data);

				// Find the category that matches the initial slug
				if (slug && slug !== 'all') {
					const category = response.data.find(
						(cat) => cat.slug === slug,
					);
					if (category) {
						setSelectedCategory(category);
					}
				} else {
					setSelectedCategory({ name: 'All', slug: 'all' });
				}
			} catch (err) {
				console.error('Error fetching categories:', err);
				toast.error('Failed to load categories');
			}
		}
		if (storeData?._id) {
			fetchCategories();
		}
	}, [storeData?._id, slug]);

	useEffect(() => {
		if (selectedCategory && allProducts.length > 0) {
			setIsLoading(true);
			if (selectedCategory.slug === 'all') {
				setFilteredProducts(allProducts);
			} else {
				setFilteredProducts(
					allProducts.filter(
						(product) =>
							product.category?.slug ===
							selectedCategory.slug,
					),
				);
			}
			setIsLoading(false);
		}
	}, [selectedCategory, allProducts]);

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
		setIsMobileMenuOpen(false);

		// Update the URL without page reload
		router.push(
			`/store/${storeData.storeLink}/categories/${category.slug}`,
			{ scroll: false },
		);
	};

	if (error) {
		return (
			<div className="min-h-screen max-w-3xl mx-auto flex justify-center items-center">
				<StoreCard />
			</div>
		);
	}

	if (
		!storeData ||
		!storeProductsData ||
		!selectedCategory
	) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<RotatingSquare
					height="100"
					width="100"
					color={storeData?.themeColor || '#4fa94d'}
					ariaLabel="rotating-square-loading"
					strokeWidth="4"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
				/>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<StoreNavbar
				storeData={storeData}
				cart={cart}
				setCart={setCart}
				isCartOpen={isCartOpen}
				setIsCartOpen={setIsCartOpen}
			/>

			<SearchModal
				isOpen={isSearchModalOpen}
				onClose={() => setIsSearchModalOpen(false)}
			>
				<div className="p-4 w-full">
					<div className="relative">
						<input
							type="text"
							placeholder="Search products..."
							className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
							style={{
								focusRingColor: storeData?.themeColor,
							}}
							value={searchQuery}
							onChange={(e) => handleSearch(e.target.value)}
						/>
						<FaSearch className="absolute left-3 top-3.5 text-gray-400" />
					</div>
				</div>
			</SearchModal>

			<div className="container mx-auto px-4 py-8">
				<div className="mx-auto pb-0">
					{/* Mobile Category and Search */}
					<div className="lg:hidden pt-10 mb-6 flex gap-2">
						<div className="flex-1">
							<button
								onClick={() =>
									setIsMobileMenuOpen(!isMobileMenuOpen)
								}
								className="w-full flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200"
								style={{ color: storeData?.themeColor }}
							>
								<span className="font-medium">
									{selectedCategory.name}
								</span>
								{isMobileMenuOpen ? (
									<FaChevronUp />
								) : (
									<FaChevronDown />
								)}
							</button>

							{isMobileMenuOpen && (
								<div className="mt-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
									{categories.map((category) => (
										<button
											key={category._id}
											onClick={() =>
												handleCategorySelect(category)
											}
											className={`w-full text-left px-4 py-3 ${
												selectedCategory.slug ===
												category.slug
													? 'bg-gray-100 font-medium'
													: 'hover:bg-gray-50'
											}`}
											style={{
												color:
													selectedCategory.slug ===
													category.slug
														? storeData?.themeColor
														: 'inherit',
											}}
										>
											{category.name}
										</button>
									))}
								</div>
							)}
						</div>
						<button
							onClick={() => setIsSearchModalOpen(true)}
							className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center"
							style={{ color: storeData?.themeColor }}
						>
							<FaSearch className="text-lg" />
						</button>
					</div>
				</div>

				<div className="flex md:pt-10 md:pb-20 flex-col lg:flex-row gap-8">
					{/* Desktop Category Sidebar */}
					<div className="hidden lg:block w-full lg:w-64 flex-shrink-0">
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
							<h3
								className="font-semibold text-lg mb-4"
								style={{ color: storeData?.themeColor }}
							>
								Categories
							</h3>
							<div className="space-y-2">
								{categories.map((category) => (
									<button
										key={category._id}
										onClick={() =>
											handleCategorySelect(category)
										}
										className={`w-full text-left px-3 py-2 rounded ${
											selectedCategory.slug ===
											category.slug
												? 'bg-gray-100 font-medium'
												: 'hover:bg-gray-50'
										}`}
										style={{
											color:
												selectedCategory.slug ===
												category.slug
													? storeData?.themeColor
													: 'inherit',
										}}
									>
										{category.name}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Products Section */}
					<div className="flex-1 pb-20">
						<div className="mb-6 hidden md:block">
							<input
								type="text"
								value={searchQuery}
								onChange={(e) =>
									handleSearch(e.target.value)
								}
								className="border py-4 px-3 rounded-lg focus:border-[1px] focus:border-gray-100 w-full md:w-2/3"
								placeholder="Search for products..."
							/>
						</div>

						<div className="flex flex-row items-center gap-2 mb-6">
							<h2 className="text-lg md:text-2xl font-bold">
								{storeData?.name}
							</h2>
							<FaAngleRight />
							<h2
								className="text-lg md:text-2xl font-bold underline underline-offset-1"
								style={{ color: storeData?.themeColor }}
							>
								{selectedCategory.name === 'All'
									? 'All Products'
									: selectedCategory.name}
							</h2>
						</div>

						{isLoading ? (
							<div className="flex justify-center items-center py-12">
								<RotatingSquare
									height="50"
									width="50"
									color={storeData?.themeColor || '#4fa94d'}
									ariaLabel="rotating-square-loading"
									strokeWidth="4"
									visible={true}
								/>
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
									{filteredProducts?.length > 0 ? (
										filteredProducts?.map((product) => (
											<ProductCard
												key={product._id}
												product={product}
												themeColor={storeData?.themeColor}
												storeData={storeData}
											/>
										))
									) : (
										<div className="col-span-full text-center py-12">
											<GiHotMeal className="mx-auto text-gray-400 text-5xl mb-4" />
											<h3 className="text-lg font-medium text-gray-700">
												No products found
											</h3>
											<p className="text-gray-500 mt-1">
												{selectedCategory.name === 'All'
													? "This store doesn't have any products yet."
													: `No products in the ${selectedCategory.name} category.`}
												{searchQuery &&
													' Try a different search term.'}
											</p>
										</div>
									)}
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			<StoreFooter storeData={storeData} />
		</div>
	);
};

export default StoreCategory;
