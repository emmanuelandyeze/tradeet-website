'use client';
import Link from 'next/link';
import {
	useRouter,
	useSearchParams,
} from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoMdClose, IoMdTrash } from 'react-icons/io';
import { IoBagHandleOutline } from 'react-icons/io5';

const StoreNavbar = ({
	storeData,
	cart,
	setCart,
	isCartOpen,
	setIsCartOpen,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const searchParams = useSearchParams();
	const advId = searchParams.get('ad');

	const router = useRouter();

	// Load the cart from localStorage when the component mounts
	useEffect(() => {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) {
			const parsedCart = storedCart
				? JSON.parse(storedCart)
				: [];

			// Filter cart items based on storeId
			const filteredCart = parsedCart.filter(
				(item) => item.store === storeData?._id,
			);

			setCart(filteredCart);
		}
	}, [setCart]);

	// Save the cart to localStorage whenever it changes
	useEffect(() => {
		if (cart.length > 0) {
			localStorage.setItem('cart', JSON.stringify(cart));
		} else {
			localStorage.removeItem('cart');
		}
	}, [cart]);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const toggleCartSidebar = () => {
		setIsCartOpen(!isCartOpen);
	};

	const createVariantKey = (item) => {
		return `${item._id}-${
			item.variant?._id
		}-${item.additions?.map((add) => add._id).join('-')}`;
	};

	const addItemToCart = (item) => {
		const variantKey = createVariantKey(item);
		const existingItemIndex = cart.findIndex(
			(cartItem) =>
				createVariantKey(cartItem) === variantKey,
		);

		if (existingItemIndex !== -1) {
			const newCart = [...cart];
			newCart[existingItemIndex].quantity += item.quantity;
			setCart(newCart);
		} else {
			setCart([
				...cart,
				{ ...item, quantity: item.quantity },
			]);
		}
	};

	const removeItemFromCart = (index) => {
		const newCart = [...cart];
		newCart.splice(index, 1);
		setCart(newCart);
	};

	const clearCart = () => {
		setCart([]);
		localStorage.removeItem('cart');
	};

	const increaseQuantity = (index) => {
		const newCart = [...cart];
		newCart[index].quantity += 1;
		setCart(newCart);
	};

	const decreaseQuantity = (index) => {
		const newCart = [...cart];
		if (newCart[index].quantity > 1) {
			newCart[index].quantity -= 1;
		} else {
			newCart.splice(index, 1);
		}
		setCart(newCart);
	};

	const getTotalAmount = () => {
		return cart.reduce((total, item) => {
			// Get the base price from the variant or the product itself
			const basePrice = item?.variant
				? item?.variant?.price
				: item?.price;

			// Calculate the total price of all additions
			const additionsPrice =
				item?.additions?.reduce(
					(sum, add) => sum + (add?.price || 0),
					0,
				) || 0;
			
			console.log(item?.additions, additionsPrice)

			// Calculate total for this item
			const itemTotal =
				(basePrice + additionsPrice) * item.quantity;

			// Add to the running total
			return total + itemTotal;
		}, 0);
	};




	return (
		<nav className="bg-white z-50 bg-opacity-30 backdrop-blur-md fixed w-full border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<Link href={`/${storeData?.storeLink}`}>
								{storeData?.logoUrl ? (
									<img
										src={storeData?.logoUrl}
										className="h-12 w-12 rounded-full md:h-14 md:w-14 object-contain"
										alt=""
									/>
								) : (
									<h1 className="font-bold text-xl">
										{storeData?.name}
									</h1>
								)}
							</Link>
						</div>
					</div>

					<div className="flex items-center">
						<button
							onClick={toggleCartSidebar}
							className="relative text-gray-500 hover:text-gray-900 focus:outline-none"
						>
							<IoBagHandleOutline className="h-8 w-8" />
							{cart.length > 0 && (
								<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
									{cart.length}
								</span>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Cart Sidebar */}
			<div
				className={`fixed top-0 right-0 w-full md:w-96 z-50 bg-white bg-opacity-100 backdrop-blur-2xl min-h-screen shadow-lg transition-transform transform ${
					isCartOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-lg font-medium">
						Shopping Cart
					</h2>
					<button
						onClick={toggleCartSidebar}
						className="text-gray-500 hover:text-gray-900 focus:outline-none"
					>
						<IoMdClose className="h-6 w-6" />
					</button>
				</div>
				<div className="p-4 flex-1 h-[60vh] md:h-[70vh] overflow-y-scroll">
					{cart.length > 0 ? (
						<ul>
							{cart.map((item, index) => (
								<li
									key={index}
									className="flex justify-between items-start mb-4"
								>
									<div className="flex items-start">
										<img
											src={item?.image}
											alt={item?.name}
											className="w-12 h-12 object-cover rounded"
										/>
										<div className="ml-4">
											<p className="font-medium">
												{item?.name}
											</p>
											{item?.variant ? (
												<p className="text-gray-600">
													{item?.variant?.name} - ₦
													{new Intl.NumberFormat(
														'en-US',
													).format(item?.variant?.price)}
												</p>
											) : (
												<p className="text-gray-600">
													₦
													{new Intl.NumberFormat(
														'en-US',
													).format(item?.price)}
												</p>
											)}
											{/* Additions */}
											{item?.additions?.length > 0 && (
												<div className="mt-2">
													<p className="font-medium">
														Additions:
													</p>
													<ul>
														{item?.additions.map((add) => (
															<li
																key={add._id}
																className="text-gray-600"
															>
																{add.name} - ₦
																{new Intl.NumberFormat(
																	'en-US',
																).format(add.price)}
															</li>
														))}
													</ul>
												</div>
											)}

											<div className="flex items-center mt-2">
												<button
													onClick={() =>
														decreaseQuantity(index)
													}
													className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
												>
													-
												</button>
												<p className="px-4 py-1 border-t border-b">
													{item.quantity}
												</p>
												<button
													onClick={() =>
														increaseQuantity(index)
													}
													className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
												>
													+
												</button>
											</div>
										</div>
									</div>
									<div className="flex items-center">
										<button
											onClick={() =>
												removeItemFromCart(index)
											}
											className="text-red-500 hover:text-red-700 focus:outline-none"
										>
											<IoMdTrash className="h-5 w-5" />
										</button>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className="text-center text-gray-600">
							Your cart is empty
						</p>
					)}
				</div>
				{cart.length > 0 && (
					<div className="p-4 border-t">
						<p className="text-lg font-medium">
							Total: ₦
							{new Intl.NumberFormat('en-US').format(
								getTotalAmount(),
							)}
						</p>
						<div className="mt-4">
							<button
								onClick={() => {
									localStorage.setItem(
										'cart',
										JSON.stringify(cart),
									);
									const url = advId
										? `/${storeData?.storeLink}/checkout?ad=${advId}`
										: `/${storeData?.storeLink}/checkout`;
									router.push(url);
								}}
								className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
							>
								Proceed to Checkout
							</button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default StoreNavbar;
