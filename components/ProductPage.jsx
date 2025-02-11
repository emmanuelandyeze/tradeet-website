'use client';
import StoreNavbar from '@/components/StoreNav';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { RotatingSquare } from 'react-loader-spinner';

const ProductPage = ({ productData, storeData }) => {
	const router = useRouter();
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cart, setCart] = useState([]);
	const [productQuantity, setProductQuantity] = useState(1);
	const [variantQuantities, setVariantQuantities] =
		useState({});
	const [addOnQuantities, setAddOnQuantities] = useState(
		{},
	);

	useEffect(() => {
		if (productData?.addOns) {
			const initialAddOnQuantities = {};
			productData.addOns.forEach((addition) => {
				initialAddOnQuantities[addition._id] =
					addition.compulsory ? 1 : 0;
			});
			setAddOnQuantities(initialAddOnQuantities);
		}
		if (productData?.variants) {
			const initialVariantQuantities = {};
			productData.variants.forEach((variant) => {
				initialVariantQuantities[variant._id] = 0;
			});
			setVariantQuantities(initialVariantQuantities);
		}
	}, [productData]);

	const handleProductQuantityChange = (newQuantity) => {
		setProductQuantity(Math.max(newQuantity, 1));
	};

	const handleVariantQuantityChange = (
		variantId,
		newQuantity,
	) => {
		setVariantQuantities((prevQuantities) => ({
			...prevQuantities,
			[variantId]: Math.max(newQuantity, 0),
		}));
	};

	const handleAddOnQuantityChange = (
		additionId,
		newQuantity,
		compulsory,
	) => {
		setAddOnQuantities((prevQuantities) => ({
			...prevQuantities,
			[additionId]: compulsory
				? 1
				: Math.max(newQuantity, 0),
		}));
	};

	const totalPrice =
		productData.price * productQuantity +
		Object.entries(variantQuantities).reduce(
			(acc, [variantId, qty]) => {
				const variant = productData.variants.find(
					(v) => v._id === variantId,
				);
				return acc + (variant ? variant.price * qty : 0);
			},
			0,
		) +
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
		const selectedVariants = productData.variants
			.filter(
				(variant) => variantQuantities[variant._id] > 0,
			)
			.map((variant) => ({
				_id: variant._id,
				name: variant.name,
				price: variant.price,
				quantity: variantQuantities[variant._id],
			}));

		const selectedAddOns = productData.addOns
			.filter((addOn) => addOnQuantities[addOn._id] > 0)
			.map((addOn) => ({
				_id: addOn._id,
				name: addOn.name,
				price: addOn.price,
				quantity: addOnQuantities[addOn._id],
			}));

		const cartItem = {
			productId: productData._id,
			name: productData.name,
			image: productData.image,
			basePrice: productData.price,
			quantity: productQuantity,
			totalPrice,
			variants: selectedVariants,
			addOns: selectedAddOns,
			category: productData?.category.name,
			storeId: productData?.storeId
		};

		setCart((prevCart) => {
			const updatedCart = [...prevCart, cartItem];
			localStorage.setItem(
				'cart',
				JSON.stringify(updatedCart),
			); // Save cart to localStorage
			return updatedCart;
		});
	};

	console.log(productData)

	return (
		<div>
			<StoreNavbar
				storeData={storeData}
				cart={cart}
				setCart={setCart}
				isCartOpen={isCartOpen}
				setIsCartOpen={setIsCartOpen}
			/>
			<div
				onClick={() =>
					router.push(`/store/${storeData?.storeLink}`)
				}
				className="pt-20 px-4 flex items-center gap-3 cursor-pointer w-full max-w-4xl mx-auto"
			>
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
					<h2 className="text-3xl font-bold capitalize mb-2 pb-3">
						{productData.name}
					</h2>
					{productData?.description && (
						<p className="text-md font-light mb-2">
							{productData?.description}
						</p>
					)}
					<hr />
					<div className="flex justify-between items-center my-4">
						<p className='font-bold'>
							{productData.name} - ₦{productData.price}
						</p>
						<div className="flex items-center border rounded-lg">
							<button
								onClick={() =>
									handleProductQuantityChange(
										productQuantity - 1,
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
									handleProductQuantityChange(
										productQuantity + 1,
									)
								}
								className="bg-gray-200 px-4 py-2"
							>
								+
							</button>
						</div>
					</div>
					<hr />
					{productData.variants?.map((variant) => (
						<div
							key={variant._id}
							className="flex justify-between items-center my-4"
						>
							<p>
								{variant.name} (+₦{variant.price})
							</p>
							<div className="flex items-center border rounded-lg">
								<button
									onClick={() =>
										handleVariantQuantityChange(
											variant._id,
											variantQuantities[variant._id] - 1,
										)
									}
									className="bg-gray-200 px-4 py-2"
								>
									-
								</button>
								<span className="mx-4">
									{variantQuantities[variant._id]}
								</span>
								<button
									onClick={() =>
										handleVariantQuantityChange(
											variant._id,
											variantQuantities[variant._id] + 1,
										)
									}
									className="bg-gray-200 px-4 py-2"
								>
									+
								</button>
							</div>
						</div>
					))}
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
					<hr />
					<div className="flex justify-between items-center my-4">
						<p className="text-lg font-semibold">
							Total Price: ₦{totalPrice}
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
