import { FaBagShopping } from "react-icons/fa6";

const ProductCard = ({ product, themeColor }) => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
			<div className="aspect-square bg-gray-100 relative">
				{/* Replace with your actual image component */}
				{product.image ? (
					<img
						src={product.image}
						alt={product.name}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-gray-400">
						<GiHotMeal className="text-4xl" />
					</div>
				)}
			</div>
			<div className="p-4">
				<h3 className="font-medium text-gray-900 truncate">
					{product.name}
				</h3>
				<p className="text-gray-500 text-sm mt-1 line-clamp-2">
					{product.description}
				</p>
				<div className="mt-3 flex justify-between items-center">
					<span
						className="font-semibold"
						style={{ color: themeColor }}
					>
						₦{product.price.toFixed(2)}
					</span>
					<button
						className="p-2 rounded-full hover:bg-gray-100"
						style={{ color: themeColor }}
					>
						<FaBagShopping />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;