import { useRouter } from 'next/navigation';
import { FaBagShopping } from 'react-icons/fa6';
import { GiHotMeal } from 'react-icons/gi';

const ProductCard = ({
	product,
	themeColor,
	storeData,
}) => {
	const router = useRouter();

	return (
		<div
			className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
			onClick={() =>
				router.push(
					`/store/${storeData?.storeLink}/product/${product?._id}`,
				)
			}
		>
			{/* Product Image with Darkened Overlay */}
			<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 hover:shadow-md">
				{product.image ? (
					<img
						src={product.image}
						alt={product.name}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
						<GiHotMeal className="text-6xl" />
					</div>
				)}
			</div>

			{/* Product Info (Always Visible) */}
			{/* <div className="absolute bottom-0 left-0 group-hover:opacity-0 right-0 p-4 text-white z-10">
				<h3 className="font-bold text-xl line-clamp-1 drop-shadow-md">
					{product.name}
				</h3>
				<p
					className="font-semibold text-lg drop-shadow-md"
					style={{ color: themeColor || '#ffffff' }}
				>
					₦{product.price.toFixed(2).toLocaleString()}
				</p>
			</div> */}

			{/* Hover Overlay with Description */}
			<div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-100 transition-opacity duration-300">
				<div className="mt-auto">
					<h3 className="font-bold text-xl text-white mb-1 line-clamp-1">
						{product.name}
					</h3>
					<p className="text-gray-200 text-sm line-clamp-2 ">
						{product.description}
					</p>
					<p
						className="font-semibold text-xl drop-shadow-md mb-3"
						style={{ color: themeColor || '#ffffff' }}
					>
						₦{product.price.toFixed(2).toLocaleString()}
					</p>
					<button
						className="flex items-center gap-2 px-4 py-2 rounded-full font-medium"
						style={{
							backgroundColor: themeColor || '#4f46e5',
							color: '#ffffff',
						}}
						onClick={(e) => {
							e.stopPropagation();
							router.push(
								`/store/${storeData?.storeLink}/product/${product?._id}`,
							);
						}}
					>
						<FaBagShopping />
						<span>Buy now</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
