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
} from 'react-icons/fa6';
import toast from 'react-hot-toast';
import StoreFooter from '@/components/StoreFooter';
import { GiHotMeal } from 'react-icons/gi';
import axiosClient from '@/utils/axios';
import ProductCard from '@/components/ProductCard';

const StoreCategory = ({
	storeData,
	storeProductsData,
	slug,
}) => {
	const productsData = storeProductsData;
	const [error, setError] = useState(null);
	const [filteredProducts, setFilteredProducts] = useState(
		[],
	);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] =
		useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] =
		useState(false);
	const router = useRouter();
	const [cart, setCart] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const handleSearch = useCallback((results) => {
		setFilteredProducts(results);
	}, []);

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
		if (selectedCategory) {
			if (selectedCategory.slug === 'all') {
				setFilteredProducts(productsData);
			} else {
				setFilteredProducts(
					productsData?.filter(
						(product) =>
							product.category &&
							product.category.slug ===
								selectedCategory.slug,
					),
				);
			}
		}
	}, [selectedCategory, productsData]);

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

			<div className="container mx-auto px-4 py-8">
				{/* Mobile Category Dropdown */}
				<div className="lg:hidden pt-16 mb-6">
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
							<button
								onClick={() =>
									handleCategorySelect({
										name: 'All',
										slug: 'all',
									})
								}
								className={`w-full text-left px-4 py-3 ${
									selectedCategory.slug === 'all'
										? 'bg-gray-100 font-medium'
										: 'hover:bg-gray-50'
								}`}
								style={{
									color:
										selectedCategory.slug === 'all'
											? storeData?.themeColor
											: 'inherit',
								}}
							>
								All Categories
							</button>
							{categories.map((category) => (
								<button
									key={category._id}
									onClick={() =>
										handleCategorySelect(category)
									}
									className={`w-full text-left px-4 py-3 ${
										selectedCategory.slug === category.slug
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

				<div className="flex md:pt-20 md:pb-20 flex-col lg:flex-row gap-8">
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
					<div className="flex-1">
						<div className="mb-6">
							<SearchBar
								onSearch={handleSearch}
								placeholder="Search products..."
							/>
						</div>

						<h2
							className="text-2xl font-bold mb-6"
							style={{ color: storeData?.themeColor }}
						>
							{selectedCategory.name === 'All'
								? 'All Products'
								: selectedCategory.name}
						</h2>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{filteredProducts?.length > 0 ? (
								filteredProducts?.map((product) => (
									<ProductCard
										key={product._id}
										product={product}
										themeColor={storeData?.themeColor}
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
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<StoreFooter storeData={storeData} />
		</div>
	);
};

export default StoreCategory;
