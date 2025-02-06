'use client';

import StoreCard from '@/components/StoreCard';
import StoreNavbar from '@/components/StoreNav';
import SearchBar from '@/components/SearchBar';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { RotatingSquare } from 'react-loader-spinner';
import { FaBagShopping } from 'react-icons/fa6';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';
import StoreFooter from '@/components/StoreFooter';
import axios from 'axios';

const StorePage = ({ storeData, storeProductsData }) => {
	const { productsData } = storeProductsData;
	const [error, setError] = useState(null);
	const [filteredProducts, setFilteredProducts] =
		useState([]);
	const [categories, setCategories] = useState([]);
	 const [selectedCategory, setSelectedCategory] =
			useState('All');
	const [selectedProduct, setSelectedProduct] =
		useState(null);
	const [selectedVariants, setSelectedVariants] = useState(
		[],
	);
	const [quantity, setQuantity] = useState(1);
	const [modalVisible, setModalVisible] = useState(false);
	const router = useRouter();
	const [cart, setCart] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const handleSearch = useCallback((results) => {
		setFilteredProducts(results);
	}, []);

	const addToCart = (product) => {
		if (selectedVariants.length > 0) {
			selectedVariants.forEach((variant) => {
				const existingItemIndex = cart.findIndex(
					(cartItem) =>
						cartItem._id === product._id &&
						cartItem.variant?._id === variant._id,
				);
				if (existingItemIndex !== -1) {
					const newCart = [...cart];
					newCart[existingItemIndex].quantity +=
						variant.quantity;
					setCart(newCart);
					setIsCartOpen(true);
				} else {
					setCart([
						...cart,
						{
							...product,
							variant,
							quantity: variant.quantity,
						},
					]);
					setIsCartOpen(true);
				}
			});
		} else {
			const existingItemIndex = cart.findIndex(
				(cartItem) => cartItem._id === product._id,
			);
			if (existingItemIndex !== -1) {
				const newCart = [...cart];
				newCart[existingItemIndex].quantity += quantity;
				setCart(newCart);
				setIsCartOpen(true);
			} else {
				setCart([
					...cart,
					{
						...product,
						quantity,
					},
				]);
				setIsCartOpen(true);
			}
		}

		setModalVisible(false);
		setQuantity(1);
		setSelectedVariants([]);
		setTotalPrice(0);
	};

	const handleVariantChange = (
		index,
		variantId,
		quantity,
	) => {
		const variant = selectedProduct.variants.find(
			(v) => v._id === variantId,
		);
		const newSelectedVariants = [...selectedVariants];
		newSelectedVariants[index] = { ...variant, quantity };
		setSelectedVariants(newSelectedVariants);

		const newTotalPrice = newSelectedVariants.reduce(
			(total, item) => total + item.price * item.quantity,
			0,
		);
		setTotalPrice(newTotalPrice);
	};

	const handleQuantityChange = (newQuantity) => {
		setQuantity(newQuantity);
		setTotalPrice(selectedProduct.price * newQuantity);
	};

	const addNewVariantSelection = () => {
		setSelectedVariants([
			...selectedVariants,
			{ ...selectedProduct.variants[0], quantity: 1 },
		]);
	};

	useEffect(() => {
		async function fetchCategory() {
			// Fetch categories from the backend
			const response = await axios.get(
				`https://tradeet-api.onrender.com/category/${storeData?._id}`,
			);
			setCategories(response.data);
		}
		fetchCategory();
	}, []);

	// Filter products based on selected category
	useEffect(() => {
		if (selectedCategory === 'All') {
			setFilteredProducts(productsData); // No filter applied
		} else {
			setFilteredProducts(
				productsData.filter(
					(product) =>
						product.category &&
						product.category.name === selectedCategory,
				),
			);
		}
	}, [selectedCategory, productsData]);

	// Handle card selection for filtering
	const handleCategorySelect = (categoryName) => {
		if (selectedCategory === categoryName) {
			setSelectedCategory(null); // Deselect category
		} else {
			setSelectedCategory(categoryName); // Select category
		}
	};

	if (error) {
		return (
			<div className="min-h-screen max-w-3xl mx-auto flex justify-center items-center">
				<StoreCard />
			</div>
		);
	}

	if (!storeData || !storeProductsData) {
		return <p>Loading...</p>; // Prevents hydration issues
	}

	console.log(filteredProducts);

	return (
		<div>
			<StoreNavbar
				storeData={storeData}
				cart={cart}
				setCart={setCart}
				isCartOpen={isCartOpen}
				setIsCartOpen={setIsCartOpen}
			/>
			<div className="container max-w-6xl pb-20 mx-auto pt-20 px-4">
				{storeData?.storeBanner ? (
					<div className="mb-5">
						<img
							src={storeData?.storeBanner}
							alt={storeData?.name}
							className="w-full h-48 md:h-96 p-0 bg-gray-100 object-cover shadow-md rounded-xl"
						/>
					</div>
				) : (
					<div
						className="pb-10 md:pb-20 px-5 md:px-0 pt-10 md:pt-20 rounded-xl  shadow-sm mb-5"
						style={{
							backgroundColor:
								storeData?.themeColor || '#f1f1f1',
							color: storeData?.themeColor
								? '#f1f1f1'
								: '#121212',
						}}
					>
						<h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
							Welcome to {storeData?.name}
						</h1>
						<p className="text-md md:text-lg text-center">
							{storeData?.description}
						</p>
					</div>
				)}
				<SearchBar
					items={productsData}
					onSearch={handleSearch}
					storeData={storeData}
				/>
				{/* <div className="flex justify-between items-center mb-4">
					<h1 className="text-xl mr-5 font-semibold text-center">
						Our Catalogue
					</h1>
				</div> */}
				{/* Categories as clickable cards */}
				<div className="flex overflow-x-auto space-x-4 py-4 mb-6">
					{/* "All" category */}
					<div
						className={`px-6 py-2 bg-gray-200 rounded-lg cursor-pointer min-w-max ${
							selectedCategory === 'All'
								? 'bg-green-600 text-white'
								: 'hover:bg-gray-300'
						}`}
						onClick={() => handleCategorySelect('All')}
					>
						<h3 className="text-lg font-semibold">All</h3>
					</div>

					{/* Other categories */}
					{categories?.map((category) => (
						<div
							key={category._id}
							className={`px-6 py-2 bg-gray-200 rounded-lg cursor-pointer min-w-max ${
								selectedCategory === category.name
									? 'bg-green-600 text-white'
									: 'hover:bg-gray-300'
							}`}
							onClick={() =>
								handleCategorySelect(category.name)
							}
						>
							<h3 className="text-lg font-semibold">
								{category.name}
							</h3>
							<p className="text-sm">
								{category.description}
							</p>
						</div>
					))}
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
					{filteredProducts?.map((product) => (
						<div
							key={product._id}
							className="rounded-xl p-0 cursor-pointer border hover:shadow-md transition-shadow duration-200 relative"
							onClick={() =>
								router.push(
									`/store/${storeData?.storeLink}/product/${product?._id}`,
								)
							}
						>
							{/* <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
								-10%
							</div> */}

							<img
								src={product.image}
								alt={product.name}
								className="w-full h-48 md:h-60 p-0 bg-gray-100 object-cover rounded-t-xl"
							/>
							<div className="mb-2 mt-0 px-2">
								<h2 className="text-md capitalize md:text-lg pt-3 font-medium truncate">
									{product.name}
								</h2>
								<p className="text-gray-500">
									{product?.category?.name}
								</p>

								<p className="text-gray-700 flex flex-row items-start gap-1 mt-2 pb-2 text-lg font-normal md:text-md">
									<span className="text-slate-900 font-semibold">
										₦{' '}
										{new Intl.NumberFormat('en-US').format(
											product.price,
										)}
									</span>
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
			{modalVisible && selectedProduct && (
				<Modal onClose={() => setModalVisible(false)}>
					<div className="p-4 w-full">
						<img
							src={selectedProduct.image}
							alt={selectedProduct.name}
							className="w-full h-80 p-0 bg-gray-100 mb-4 my-2 object-cover rounded-lg"
						/>
						<h2 className="text-lg font-bold capitalize mb-2">
							{selectedProduct.name}
						</h2>
						{selectedProduct.variants.length > 0 &&
							selectedVariants.map(
								(selectedVariant, index) => (
									<div key={index} className="my-4">
										<p className="mb-2">Select Variant</p>
										<select
											className="w-full p-2 border rounded-lg"
											value={selectedVariant._id}
											onChange={(e) =>
												handleVariantChange(
													index,
													e.target.value,
													selectedVariant.quantity,
												)
											}
										>
											{selectedProduct.variants.map(
												(variant) => (
													<option
														key={variant._id}
														value={variant._id}
													>
														{variant.name} - ₦{' '}
														{new Intl.NumberFormat(
															'en-US',
														).format(variant.price)}
													</option>
												),
											)}
										</select>
										<div className="flex justify-between items-center my-4">
											<div>
												<p>Quantity</p>
											</div>
											<div className="flex items-center border rounded-lg">
												<button
													onClick={() =>
														handleVariantChange(
															index,
															selectedVariant._id,
															Math.max(
																selectedVariant.quantity -
																	1,
																1,
															),
														)
													}
													className="bg-gray-200 rounded-tl-lg rounded-bl-lg px-4 py-2"
												>
													-
												</button>
												<span className="mx-4 text-md">
													{selectedVariant.quantity}
												</span>
												<button
													onClick={() =>
														handleVariantChange(
															index,
															selectedVariant._id,
															selectedVariant.quantity + 1,
														)
													}
													className="bg-gray-200 rounded-tr-lg rounded-br-lg px-4 py-2"
												>
													+
												</button>
											</div>
										</div>
									</div>
								),
							)}
						{selectedProduct.variants.length === 0 && (
							<div className="my-4">
								<div className="flex justify-between items-center my-4">
									<div>
										<p>Quantity</p>
									</div>
									<div className="flex items-center border rounded-lg">
										<button
											onClick={() =>
												handleQuantityChange(
													Math.max(quantity - 1, 1),
												)
											}
											className="bg-gray-200 rounded-tl-lg rounded-bl-lg px-4 py-2"
										>
											-
										</button>
										<span className="mx-4 text-md">
											{quantity}
										</span>
										<button
											onClick={() =>
												handleQuantityChange(quantity + 1)
											}
											className="bg-gray-200 rounded-tr-lg rounded-br-lg px-4 py-2"
										>
											+
										</button>
									</div>
								</div>
							</div>
						)}
						<hr />
						<div className="flex justify-between items-center my-4">
							<p className="text-lg font-semibold">
								Total Price: ₦
								{new Intl.NumberFormat('en-US').format(
									totalPrice,
								)}
							</p>
							<button
								onClick={() => addToCart(selectedProduct)}
								style={{
									backgroundColor: storeData?.themeColor,
								}}
								className="text-white px-4 py-2 rounded-lg hover:bg-teal-600"
							>
								Add to Cart
							</button>
						</div>
					</div>
				</Modal>
			)}
			<StoreFooter storeData={storeData} />
		</div>
	);
};

export default StorePage;
