'use client';
import StoreNavbar from '@/components/StoreNav';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { RotatingSquare } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const ProductPage = ({ productData, storeData }) => {
	const router = useRouter();
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cart, setCart] = useState([]);
	const [productQuantity, setProductQuantity] = useState(1);
	const [selectedVariant, setSelectedVariant] = useState(
		productData._id,
	); // Default to main product
	const [addOnQuantities, setAddOnQuantities] = useState(
		{},
	);
	const [specialInstructions, setSpecialInstructions] =
		useState(''); // New state for special instructions
	
	const notify = () => toast('Item added to cart!');

	// Include the main product in the variants list
	const productVariants = [
		{
			_id: productData._id,
			name: productData.name,
			price: productData.price,
		},
		...(productData.variants || []),
	];

	// Initialize Add-On Quantities
	useEffect(() => {
		if (productData?.addOns) {
			const initialAddOnQuantities = {};
			productData.addOns.forEach((addOn) => {
				initialAddOnQuantities[addOn._id] = addOn.compulsory
					? 1
					: 0;
			});
			setAddOnQuantities(initialAddOnQuantities);
		}
	}, [productData]);

	const handleVariantSelection = (variantId) => {
		setSelectedVariant(variantId);
	};

	const handleAddOnQuantityChange = (
		addOnId,
		newQuantity,
		compulsory,
	) => {
		setAddOnQuantities((prevQuantities) => ({
			...prevQuantities,
			[addOnId]: compulsory ? 1 : Math.max(newQuantity, 0),
		}));
	};

	// Calculate Total Price
	const selectedVariantData = productVariants.find(
		(v) => v._id === selectedVariant,
	);
	const totalPrice =
		(selectedVariantData?.price || 0) * productQuantity +
		Object.entries(addOnQuantities).reduce(
			(acc, [addOnId, qty]) => {
				const addOn = productData.addOns.find(
					(a) => a._id === addOnId,
				);
				return acc + (addOn ? addOn.price * qty : 0);
			},
			0,
		);

	const addToCart = () => {
		const selectedAddOns = productData.addOns
			.filter((addOn) => addOnQuantities[addOn._id] > 0)
			.map((addOn) => ({
				_id: addOn._id,
				name: addOn.name,
				price: addOn.price,
				quantity: addOnQuantities[addOn._id],
			}));

		const cartItem = {
			productId: selectedVariantData._id,
			name: selectedVariantData.name,
			image: productData.image,
			basePrice: selectedVariantData.price,
			quantity: productQuantity,
			totalPrice,
			addOns: selectedAddOns,
			specialInstructions, // Store user input in the cart
			category: productData?.category.name,
			storeId: productData?.storeId,
		};

		setCart((prevCart) => {
			const updatedCart = [...prevCart, cartItem];
			localStorage.setItem(
				'cart',
				JSON.stringify(updatedCart),
			); // Save cart to localStorage
			return updatedCart;
		});
		notify(); // Show notification when item is added to cart
	};

	return (
		<div>
			<StoreNavbar
				storeData={storeData}
				cart={cart}
				setCart={setCart}
				isCartOpen={isCartOpen}
				setIsCartOpen={setIsCartOpen}
			/>

			{/* Back Button */}
			<div
				onClick={() =>
					router.back()
				}
				className="pt-20 px-4 flex items-center gap-3 cursor-pointer w-full max-w-4xl mx-auto"
			>
				<FaChevronLeft />
				<h1 className="text-lg font-bold capitalize">
					Back to Store
				</h1>
			</div>

			{/* Product Display */}
			<div className="pt-4 px-4 flex flex-col lg:flex-row items-start justify-between gap-5 w-full max-w-4xl mx-auto">
				<img
					src={productData.image}
					alt={productData.name}
					className="w-full lg:w-[50%] lg:h-96 h-80 bg-gray-100 mb-4 my-2 object-cover rounded-lg"
				/>

				{/* Product Details */}
				<div className="w-full pt-2 lg:w-50%">
					<h2 className="text-3xl font-bold capitalize mb-2 pb-3">
						{productData.name}
					</h2>
					{productData?.description && (
						<p className="text-md font-light mb-2">
							{productData.description}
						</p>
					)}
					<hr />

					{/* Variants Selection (Includes Main Product) */}
					<div className="my-4">
						<p className="font-bold">Choose an option:</p>
						{productVariants.map((variant) => (
							<div
								key={variant._id}
								className="flex justify-between items-center my-2"
							>
								<label className="flex items-center gap-3">
									<input
										type="radio"
										name="variant"
										value={variant._id}
										checked={
											selectedVariant === variant._id
										}
										onChange={() =>
											handleVariantSelection(variant._id)
										}
									/>
									<span>
										{variant.name} - ₦
										{variant.price?.toLocaleString()}
									</span>
								</label>
							</div>
						))}
					</div>
					<hr />

					{/* Quantity Selection */}
					<div className="flex justify-between items-center my-4">
						<p className="font-bold">Quantity</p>
						<div className="flex items-center border rounded-lg">
							<button
								onClick={() =>
									setProductQuantity(
										Math.max(productQuantity - 1, 1),
									)
								}
								className="bg-gray-200 px-4 py-2"
							>
								-
							</button>
							<span className="mx-4">
								{productQuantity}
							</span>
							<button
								onClick={() =>
									setProductQuantity(productQuantity + 1)
								}
								className="bg-gray-200 px-4 py-2"
							>
								+
							</button>
						</div>
					</div>
					<hr />

					{/* Add-Ons */}
					{productData.addOns?.map((addOn) => (
						<div
							key={addOn._id}
							className="flex justify-between items-center my-4"
						>
							<p>
								{addOn.name} (+₦{addOn.price})
							</p>
							<div className="flex items-center border rounded-lg">
								<button
									onClick={() =>
										handleAddOnQuantityChange(
											addOn._id,
											addOnQuantities[addOn._id] - 1,
											addOn.compulsory,
										)
									}
									className="bg-gray-200 px-4 py-2"
								>
									-
								</button>
								<span className="mx-4">
									{addOnQuantities[addOn._id]}
								</span>
								<button
									onClick={() =>
										handleAddOnQuantityChange(
											addOn._id,
											addOnQuantities[addOn._id] + 1,
											addOn.compulsory,
										)
									}
									className="bg-gray-200 px-4 py-2"
								>
									+
								</button>
							</div>
						</div>
					))}

					{/* Special Instructions */}
					<div className="my-4">
						<p className="font-bold">
							Special Instructions (Optional)
						</p>
						<textarea
							className="w-full p-2 border rounded-lg"
							placeholder="E.g., No onions, extra spicy..."
							value={specialInstructions}
							onChange={(e) =>
								setSpecialInstructions(e.target.value)
							}
						></textarea>
					</div>

					{/* Add to Cart Button */}
					<div className="flex justify-between items-center my-4">
						<p className="text-lg font-semibold">
							Total Price: ₦{totalPrice?.toLocaleString()}
						</p>
						<button
							onClick={addToCart}
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

