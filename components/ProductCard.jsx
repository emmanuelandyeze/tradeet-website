// Example ProductCard.jsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaEye } from 'react-icons/fa'; // For quick view icon

const ProductCard = ({
	product,
	storeLink,
	serviceType,
	themeColor,
	onQuickView,
}) => {
	const router = useRouter();

	const handleCardClick = () => {
		router.push(
			`/store/${storeLink}/product/${product?._id}`,
		);
	};

	const handleQuickViewClick = (e) => {
		e.stopPropagation(); // Prevent card click from firing
		onQuickView(product);
	};

	return (
		<div className="rounded-xl border hover:shadow-lg transition-shadow duration-300 relative flex flex-col overflow-hidden group">
			<div className="relative overflow-hidden w-full h-40 md:h-60">
				<img
					src={product.image}
					alt={product.name}
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl"
				/>
				{serviceType !== 'services' && (
					<button
						onClick={handleQuickViewClick}
						className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						title="Quick View"
					>
						<FaEye className="text-3xl" />
					</button>
				)}
			</div>
			<div className="p-3 flex flex-col flex-grow">
				<h3 className="text-md capitalize md:text-lg font-semibold truncate mb-1">
					{product.name}
				</h3>
				<p className="text-gray-500 text-xs md:text-sm mb-2">
					{product?.category?.name}
				</p>
				{serviceType !== 'services' && (
					<p className="text-slate-900 font-bold text-lg md:text-xl mt-auto">
						₦{' '}
						{new Intl.NumberFormat('en-US').format(
							product.price,
						)}
					</p>
				)}

				<button
					onClick={handleCardClick}
					style={{
						backgroundColor: themeColor || '#4fa94d',
					}}
					className="mt-3 w-full text-white py-2 rounded-lg text-sm md:text-base hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
				>
					{serviceType === 'services'
						? 'Add to Cart'
						: 'Add to Cart'}
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
