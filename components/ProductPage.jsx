'use client';
import StoreNavbar from '@/components/StoreNav';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { RotatingSquare } from 'react-loader-spinner';

const ProductPage = ({ productData, storeData }) => {
	const router = useRouter()
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [selectedVariant, setSelectedVariant] =
		useState(null);
	const [selectedAdditions, setSelectedAdditions] =
		useState([]);
	const [quantity, setQuantity] = useState(1);
	const [cart, setCart] = useState([]);
	

	// Pre-select compulsory additions
	useEffect(() => {
		if (productData?.addOns) {
			const compulsoryAdditions = productData.addOns
				.filter((addition) => addition.compulsory)
				.map((addition) => addition._id);
			setSelectedAdditions(compulsoryAdditions);
		}
	}, [productData]);

	// Handle variant change
	const handleVariantChange = (variantId) => {
		if (variantId === 'base') {
			setSelectedVariant(null);
		} else {
			const variant = productData?.variants.find(
				(variant) => variant._id === variantId,
			);
			if (variant) setSelectedVariant(variant);
		}
	};

	// Handle additions change
	const handleAdditionChange = (additionId) => {
		setSelectedAdditions((prevSelected) => {
			if (prevSelected.includes(additionId)) {
				return prevSelected.filter(
					(id) => id !== additionId,
				);
			} else {
				return [...prevSelected, additionId];
			}
		});
	};

	const handleQuantityChange = (newQuantity) => {
		setQuantity(newQuantity);
	};

	// Calculate total price
	const basePrice = selectedVariant
		? selectedVariant.price
		: productData?.price;

	const additionsPrice = selectedAdditions.reduce(
		(acc, additionId) => {
			const addition = productData.addOns.find(
				(addition) => addition._id === additionId,
			);
			return addition ? acc + addition.price : acc;
		},
		0,
	);

	const totalPrice =
		(basePrice + additionsPrice) * quantity;
	
	console.log('variants', selectedVariant)

	const addToCart = (productData) => {
		const cartItem = {
			...productData,
			variant: selectedVariant,
			additions: selectedAdditions.map((additionId) =>
				productData.addOns.find(
					(addition) => addition._id === additionId,
				),
			),
			quantity,
			totalPrice,
			store: storeData?._id
		};

		// Check if item already exists in cart
		const existingItemIndex = cart.findIndex((cartItem) => {
			const sameProduct = cartItem._id === productData._id;
			const sameVariant =
				(cartItem.variant?._id || null) ===
				(selectedVariant?._id || null);
			const sameAdditions =
				JSON.stringify(
					cartItem.addOns.map((a) => a._id).sort(),
				) === JSON.stringify(selectedAdditions.sort());
			return sameProduct && sameVariant && sameAdditions;
		});

		if (existingItemIndex !== -1) {
			const newCart = [...cart];
			newCart[existingItemIndex].quantity += quantity;
			setCart(newCart);
		} else {
			setCart([...cart, cartItem]);
		}

		setIsCartOpen(true);
		setQuantity(1);
		// Optionally reset selected additions
		// setSelectedAdditions([]);
	};

	const formatPrice = (price) => {
		return new Intl.NumberFormat('en-US').format(price);
	};

	if (!productData) {
		return (
			<div className="w-full min-h-screen flex justify-center items-center">
				<RotatingSquare
					visible={true}
					height="100"
					width="100"
					color="#4fa94d"
					ariaLabel="rotating-square-loading"
					wrapperStyle={{}}
					wrapperClass=""
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
			<div onClick={() => router.push(`/${storeData?.storeLink}`)} className="pt-20 px-4 flex items-center gap-3 cursor-pointer w-full max-w-4xl mx-auto">
				<FaChevronLeft />
				<h1 className="text-lg font-bold capitalize">
					Back to Store
				</h1>
			</div>
			<div className="pt-4 px-4 flex flex-col lg:flex-row items-start justify-between gap-5 w-full max-w-4xl mx-auto">
				<img
					src={productData.image}
					alt={productData.name}
					className="w-full lg:w-[50%] lg:h-96 h-80 p-0 bg-gray-100 mb-4 my-2 object-cover rounded-lg"
				/>
				<div className="w-full pt-2 lg:w-50%">
					<h2 className="text-3xl font-bold capitalize mb-2">
						{productData.name}
					</h2>
					{productData?.description && (
						<div>
							<h2 className="text-md font-light mb-2">
								{productData?.description}
							</h2>
							<hr />
						</div>
					)}

					<div className="my-4">
						{/* Variant Selection */}
						{productData.variants.length > 0 && (
							<>
								<p className="mb-2">Select Variant</p>
								<select
									className="w-full p-2 border rounded-lg"
									value={selectedVariant?._id || 'base'}
									onChange={(e) =>
										handleVariantChange(e.target.value)
									}
								>
									<option value="base">
										{productData.name} - ₦{' '}
										{formatPrice(productData.price)}
									</option>
									{productData.variants.map((variant) => (
										<option
											key={variant._id}
											value={variant._id}
										>
											{productData.name} - {variant.name} -
											₦ {formatPrice(variant.price)}
										</option>
									))}
								</select>
							</>
						)}

						{/* Additions Selection */}
						{productData.addOns &&
							productData.addOns.length > 0 && (
								<div className="my-4">
									<p className="mb-2">Select Additions</p>
									<div className="grid grid-cols-1 gap-2">
										{productData.addOns.map(
											(addition) => (
												<label
													key={addition._id}
													className="flex items-center space-x-2"
												>
													<input
														type="checkbox"
														checked={selectedAdditions.includes(
															addition._id,
														)}
														onChange={() =>
															handleAdditionChange(
																addition._id,
															)
														}
														disabled={addition.compulsory}
													/>
													<span>
														{addition.name} - ₦{' '}
														{formatPrice(addition.price)}
														{addition.compulsory &&
															' (Compulsory)'}
													</span>
												</label>
											),
										)}
									</div>
								</div>
							)}

						{/* Quantity Selector */}
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
									disabled={quantity <= 1}
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

					<hr />
					<div className="flex justify-between items-center my-4">
						<p className="text-lg font-semibold">
							Total Price: ₦{formatPrice(totalPrice)}
						</p>
						<button
							onClick={() => addToCart(productData)}
							className="text-white px-4 py-2 rounded-lg hover:bg-teal-600"
							style={{ backgroundColor: '#38bdf8' }}
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
