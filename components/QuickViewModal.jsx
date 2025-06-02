// Example QuickViewModal.jsx
import React from 'react';
import Modal from './Modal'; // Your existing Modal component

const QuickViewModal = ({
    product,
    quantity,
    setQuantity,
    selectedVariants,
    handleVariantChange,
    addNewVariantSelection,
    removeVariantSelection,
    totalPrice,
    addToCart,
    onClose,
    storeThemeColor
}) => {
    return (
        <Modal onClose={onClose} title={product.name}>
            <div className="p-4 flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/2 w-full flex-shrink-0">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="md:w-1/2 w-full">
                    <h2 className="text-2xl font-bold capitalize mb-2">{product.name}</h2>
                    <p className="text-gray-700 mb-4">{product.description}</p>

                    {product.variants?.length > 0 ? (
                        <>
                            {selectedVariants.map((selectedVariant, index) => (
                                <div key={index} className="my-4 p-3 border rounded-lg bg-gray-50">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-medium text-gray-800">
                                            Variant #{index + 1}
                                        </p>
                                        {selectedVariants.length > 1 && (
                                            <button
                                                onClick={() => removeVariantSelection(index)}
                                                className="text-red-500 text-sm hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                    <select
                                        className="w-full p-2 border rounded-lg mb-3 focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                        value={selectedVariant._id}
                                        onChange={(e) =>
                                            handleVariantChange(index, e.target.value, selectedVariant.quantity)
                                        }
                                    >
                                        {product.variants.map((variant) => (
                                            <option key={variant._id} value={variant._id}>
                                                {variant.name} - ₦{' '}
                                                {new Intl.NumberFormat('en-US').format(variant.price)}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-600">Quantity</p>
                                        <div className="flex items-center border rounded-lg">
                                            <button
                                                onClick={() =>
                                                    handleVariantChange(index, selectedVariant._id, Math.max(selectedVariant.quantity - 1, 1))
                                                }
                                                className="bg-gray-200 rounded-tl-lg rounded-bl-lg px-4 py-2 hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span className="mx-4 text-md font-medium">
                                                {selectedVariant.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleVariantChange(index, selectedVariant._id, selectedVariant.quantity + 1)
                                                }
                                                className="bg-gray-200 rounded-tr-lg rounded-br-lg px-4 py-2 hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={addNewVariantSelection}
                                className="w-full py-2 text-sm text-blue-600 border border-blue-600 rounded-lg mb-4 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            >
                                + Add Another Variant
                            </button>
                        </>
                    ) : (
                        <div className="my-4">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-gray-600">Quantity</p>
                                <div className="flex items-center border rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                                        className="bg-gray-200 rounded-tl-lg rounded-bl-lg px-4 py-2 hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="mx-4 text-md font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="bg-gray-200 rounded-tr-lg rounded-br-lg px-4 py-2 hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <hr className="my-4 border-gray-200" />
                    <div className="flex justify-between items-center mt-6">
                        <p className="text-xl font-bold">
                            Total: ₦{' '}
                            {new Intl.NumberFormat('en-US').format(totalPrice)}
                        </p>
                        <button
                            onClick={addToCart}
                            style={{ backgroundColor: storeThemeColor || '#4fa94d' }}
                            className="text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default QuickViewModal;