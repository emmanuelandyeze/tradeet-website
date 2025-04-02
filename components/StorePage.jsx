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
import { FiShoppingBag } from 'react-icons/fi';
import axiosClient from '@/utils/axios';

const StorePage = ({ storeData, storeProductsData }) => {
	const { productsData } = storeProductsData;
	const [error, setError] = useState(null);
	const [filteredProducts, setFilteredProducts] = useState(
		[],
	);
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
	const [categoryModalVisible, setCategoryModalVisible] =
		useState(false);
	const [categoryProducts, setCategoryProducts] = useState(
		[],
	);
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
					toast.success('Item quantity updated in cart');
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
					toast.success('Item added to cart');
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
				toast.success('Item quantity updated in cart');
			} else {
				setCart([
					...cart,
					{
						...product,
						quantity,
					},
				]);
				setIsCartOpen(true);
				toast.success('Item added to cart');
			}
		}

		setModalVisible(false);
		setCategoryModalVisible(false);
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

	const removeVariantSelection = (index) => {
		const newSelectedVariants = [...selectedVariants];
		newSelectedVariants.splice(index, 1);
		setSelectedVariants(newSelectedVariants);

		const newTotalPrice = newSelectedVariants.reduce(
			(total, item) => total + item.price * item.quantity,
			0,
		);
		setTotalPrice(newTotalPrice);
	};

	useEffect(() => {
		async function fetchCategory() {
			try {
				const response = await axiosClient.get(
					`/category/${storeData?._id}`,
				);
				setCategories(response.data);
			} catch (err) {
				console.error('Error fetching categories:', err);
				toast.error('Failed to load categories');
			}
		}
		if (storeData?._id) {
			fetchCategory();
		}
	}, [storeData?._id]);

	console.log(categories)

	useEffect(() => {
		if (storeData?.serviceType !== 'services') {
			if (selectedCategory === 'All') {
				setFilteredProducts(productsData);
			} else {
				setFilteredProducts(
					productsData.filter(
						(product) =>
							product.category &&
							product.category.name === selectedCategory,
					),
				);
			}
		}
	}, [
		selectedCategory,
		productsData,
		storeData?.serviceType,
	]);

	const handleCategorySelect = (categoryName) => {
		if (storeData?.serviceType === 'services') {
			const categoryProducts = productsData.filter(
				(product) =>
					product.category &&
					product.category.name === categoryName,
			);
			setCategoryProducts(categoryProducts);
			setSelectedCategory(categoryName);
			setCategoryModalVisible(true);
		} else {
			setSelectedCategory(
				categoryName === selectedCategory
					? 'All'
					: categoryName,
			);
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
		<div>
			<StoreNavbar
				storeData={storeData}
				cart={cart}
				setCart={setCart}
				isCartOpen={isCartOpen}
				setIsCartOpen={setIsCartOpen}
			/>
			<div className="container min-h-screen max-w-6xl pb-20 mx-auto pt-20 px-4">
				{storeData?.storeBanner ? (
					<div className="mb-5">
						<img
							src={storeData?.storeBanner}
							alt={storeData?.name}
							className="w-full h-48 md:h-[26rem] p-0 bg-gray-100 md:object-cover object-cover shadow-md rounded-xl"
						/>
					</div>
				) : (
					<div
						className="pb-10 md:pb-20 px-5 md:px-0 pt-10 md:pt-20 rounded-xl shadow-sm mb-5"
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

				{/* <SearchBar
					items={productsData}
					onSearch={handleSearch}
					storeData={storeData}
				/> */}

				{storeData?.serviceType === 'services' ? (
					<div className="text-center">
						{/* <FaBagShopping className="mx-auto text-4xl text-gray-300 mb-4" />
						<p className="text-gray-500">
							Select a category to view offerings
						</p> */}
					</div>
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
						{filteredProducts?.length > 0 ? (
							filteredProducts.map((product) => (
								<div
									key={product._id}
									className="rounded-xl p-0 cursor-pointer border hover:shadow-md transition-shadow duration-200 relative"
									onClick={() =>
										router.push(
											`/store/${storeData?.storeLink}/product/${product?._id}`,
										)
									}
								>
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-40 md:h-60 p-0 bg-gray-100 object-cover rounded-t-xl"
									/>
									<div className="mb-0 mt-0 px-2">
										<h2 className="text-md capitalize md:text-lg pt-3 font-medium truncate">
											{product.name}
										</h2>
										<p className="text-gray-500 text-xs md:text-sm">
											{product?.category?.name}
										</p>
										<p className="text-gray-700 flex flex-row items-start gap-1 mt-2 pb-2 text-md md:text-lg font-normal md:text-md">
											<span className="text-slate-900 font-semibold">
												₦{' '}
												{new Intl.NumberFormat(
													'en-US',
												).format(product.price)}
											</span>
										</p>
									</div>
								</div>
							))
						) : (
							<div className="col-span-full text-center py-10">
								<p className="text-gray-500">
									No products found
								</p>
							</div>
						)}
					</div>
				)}

				<div className="flex overflow-x-auto space-x-2 pb-4 mb-3">
					{storeData?.serviceType !== 'services' && (
						<div
							className={`px-6 py-2 bg-gray-200 rounded-lg cursor-pointer min-w-max ${
								selectedCategory === 'All'
									? 'bg-green-600 text-white'
									: 'hover:bg-gray-300'
							}`}
							onClick={() => setSelectedCategory('All')}
						>
							<h3 className="text-xs md:text-md font-semibold">
								All
							</h3>
						</div>
					)}

					{storeData?.serviceType === 'services' && (
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{categories?.map((category) => (
								<div
									key={category._id}
									className={`flex flex-col px-5 py-2 bg-gray-200 rounded-lg h-30 w-[100%] md:h-60 justify-center items-center text-xs md:text-md cursor-pointer ${
										storeData?.serviceType !== 'services' &&
										selectedCategory === category.name
											? 'bg-green-600 text-white'
											: 'hover:bg-gray-300'
									}`}
									onClick={() =>
										router.push(
											`/store/${storeData.storeLink}/categories/${category.slug}`,
										)
									}
								>
									{category.image ? (
										<img
											src={category.image}
											alt={category.name}
											className="w-40 h-40 rounded-full object-cover"
										/>
									) : (
										<FiShoppingBag
											className="text-[100px]"
											color="gray"
										/>
									)}

									<h3 className="text-lg md:text-xl mt-2 md:text-md text-center font-semibold">
										{category.name}
									</h3>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Product Detail Modal */}
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
						<p className="text-gray-600 mb-4">
							{selectedProduct.description}
						</p>

						{selectedProduct.variants?.length > 0 ? (
							<>
								{selectedVariants.map(
									(selectedVariant, index) => (
										<div
											key={index}
											className="my-4 p-3 border rounded-lg"
										>
											<div className="flex justify-between items-center mb-2">
												<p className="font-medium">
													Variant #{index + 1}
												</p>
												{selectedVariants.length > 1 && (
													<button
														onClick={() =>
															removeVariantSelection(index)
														}
														className="text-red-500 text-sm"
													>
														Remove
													</button>
												)}
											</div>
											<select
												className="w-full p-2 border rounded-lg mb-3"
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
											<div className="flex justify-between items-center">
												<div>
													<p className="text-sm">
														Quantity
													</p>
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
																selectedVariant.quantity +
																	1,
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
								<button
									onClick={addNewVariantSelection}
									className="w-full py-2 text-sm text-blue-500 border border-blue-500 rounded-lg mb-4"
								>
									+ Add Another Variant
								</button>
							</>
						) : (
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
						<hr className="my-4" />
						<div className="flex justify-between items-center my-4">
							<p className="text-lg font-semibold">
								Total Price: ₦
								{new Intl.NumberFormat('en-US').format(
									totalPrice ||
										selectedProduct.price * quantity,
								)}
							</p>
							<button
								onClick={() => addToCart(selectedProduct)}
								style={{
									backgroundColor: storeData?.themeColor,
								}}
								className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
							>
								Add to Cart
							</button>
						</div>
					</div>
				</Modal>
			)}

			{/* Category Products Modal (for services) */}
			{categoryModalVisible && (
				<Modal
					onClose={() => setCategoryModalVisible(false)}
					title={selectedCategory}
				>
					<div className="max-h-[70vh] overflow-y-auto">
						{categoryProducts.length > 0 ? (
							categoryProducts.map((product) => (
								<div
									key={product._id}
									className="p-4 border-b cursor-pointer hover:bg-gray-50"
									// onClick={() => {
									// 	setSelectedProduct(product);
									// 	setModalVisible(true);
									// 	setCategoryModalVisible(false);
									// }}
									onClick={() =>
										router.push(
											`/store/${storeData?.storeLink}/product/${product?._id}`,
										)
									}
								>
									<div className="flex items-center">
										<img
											src={product.image}
											alt={product.name}
											className="w-16 h-16 object-cover rounded-lg mr-4"
										/>
										<div>
											<h3 className="font-medium">
												{product.name}
											</h3>
											<p className="text-gray-600">
												₦{' '}
												{new Intl.NumberFormat(
													'en-US',
												).format(product.price)}
											</p>
											{product.description && (
												<p className="text-gray-500 text-sm mt-1 line-clamp-2">
													{product.description}
												</p>
											)}
										</div>
									</div>
								</div>
							))
						) : (
							<div className="text-center py-10">
								<FaBagShopping className="mx-auto text-4xl text-gray-300 mb-4" />
								<p className="text-gray-500">
									No services found in this category
								</p>
							</div>
						)}
					</div>
				</Modal>
			)}

			<StoreFooter storeData={storeData} />
		</div>
	);
};

export default StorePage;
