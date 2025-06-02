// Example CategoryFilter.jsx
import React from 'react';
import { FiShoppingBag } from 'react-icons/fi'; // Default icon

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory, serviceType, themeColor }) => {
    return (
        <div className="flex overflow-x-auto space-x-3 py-2 scrollbar-hide md:justify-center lg:justify-start">
            {serviceType !== 'services' && (
                <button
                    className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200
                        ${selectedCategory === 'All' ? 'text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                    }
                    style={selectedCategory === 'All' ? { backgroundColor: themeColor || '#4fa94d' } : {}}
                    onClick={() => onSelectCategory('All')}
                >
                    All
                </button>
            )}

            {categories.map((category) => (
                <button
                    key={category._id}
                    className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200
                        ${selectedCategory === category.name && serviceType !== 'services' ? 'text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                    }
                    style={selectedCategory === category.name && serviceType !== 'services' ? { backgroundColor: themeColor || '#4fa94d' } : {}}
                    onClick={() => onSelectCategory(category.name)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;