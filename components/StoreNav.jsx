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
			const parsedCart = JSON.parse(storedCart) || [];
			const storeSpecificCart = parsedCart.filter(
				(item) => item.storeId === storeData._id,
			);
			setCart(storeSpecificCart);
		}
	}, [setCart, storeData]);


	// Save the cart to localStorage whenever it changes
	useEffect(() => {
		if (cart.length > 0) {
			localStorage.setItem('cart', JSON.stringify(cart));
		} else {
			localStorage.removeItem('cart');
		}
	}, [cart]);

	const toggleCartSidebar = () => {
		setIsCartOpen(!isCartOpen);
	};

	const clearCart = () => {
		const confirmClear = window.confirm(
			'Are you sure you want to clear your cart?',
		);
		if (confirmClear) {
			setCart([]);
			localStorage.removeItem('cart'); // Clear cart from localStorage
		}
	};

	const removeCartItem = (productId) => {
		console.log(productId)
		setCart((prevCart) => {
			const updatedCart = prevCart.filter(
				(item) => item.productId !== productId,
			);
			localStorage.setItem(
				'cart',
				JSON.stringify(updatedCart),
			); // Update localStorage
			return updatedCart;
		});
	};

	const getTotalAmount = () => {
		return cart.reduce((total, item) => {
			const addOnsTotal =
				item.addOns?.reduce(
					(sum, addOn) =>
						sum + addOn.price * addOn.quantity,
					0,
				) || 0;
			const variantsTotal =
				item.variants?.reduce(
					(sum, variant) =>
						sum + variant.price * variant.quantity,
					0,
				) || 0;
			return (
				total +
				item.basePrice * item.quantity +
				addOnsTotal +
				variantsTotal
			);
		}, 0);
	};

	return (
		<nav className="bg-white z-50 bg-opacity-30 backdrop-blur-md fixed w-full border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<Link href={`/store/${storeData?.storeLink}`}>
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
									className="flex flex-col mb-4"
								>
									<div className="flex items-start">
										<img
											src={item.image}
											alt={item.name}
											className="w-12 h-12 object-cover rounded"
										/>
										<div className="ml-4">
											<p className="font-medium">
												{item.name} - x{item.quantity}
											</p>
											<p className="text-gray-600">
												₦{item.basePrice * item.quantity}
											</p>
											{item.variants?.map(
												(variant, idx) => (
													<p
														key={idx}
														className="text-sm text-gray-500"
													>
														{variant.name} - ₦
														{variant.price} x{' '}
														{variant.quantity}
													</p>
												),
											)}
											{item.addOns?.map((addOn, idx) => (
												<p
													key={idx}
													className="text-sm text-gray-500"
												>
													{addOn.name} - ₦{addOn.price} x{' '}
													{addOn.quantity}
												</p>
											))}
										</div>
										<button
											className="mt-1 ml-5"
											onClick={() =>
												removeCartItem(item.productId)
											}
										>
											<IoMdTrash color="red" />
										</button>
									</div>
								</li>
							))}
							<div className="mt-10 flex text-center justify-center items-center">
								<button
									className="flex flex-row gap-1 items-center"
									onClick={() => clearCart()}
								>
									<IoMdTrash className="text-red-400" />
									<p className="text-center italic text-red-400">
										Clear cart
									</p>
								</button>
							</div>
						</ul>
					) : (
						<div className='flex justify-center items-center min-h-full'>
							<p className="text-center text-2xl text-gray-600">
								Your cart is empty
							</p>
						</div>
					)}
				</div>
				{cart.length > 0 && (
					<div>
						<div className="p-4 border-t flex flex-row items-center justify-between">
							<p className="text-lg font-medium">Total</p>
							<p className="text-lg font-bold">
								₦{getTotalAmount()?.toLocaleString()}
							</p>
						</div>
						<div className="px-5">
							<button
								onClick={() =>
									router.push(
										`/store/${storeData?.storeLink}/checkout`,
									)
								}
								className="w-full font-bold rounded-lg px-4 py-3 text-white bg-blue-500 hover:bg-blue-700 focus:outline-none"
							>
								Checkout
							</button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default StoreNavbar;
