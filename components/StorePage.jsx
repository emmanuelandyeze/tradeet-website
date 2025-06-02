'use client';

import StoreCard from '@/components/StoreCard';
import StoreNavbar from '@/components/StoreNav';
import SearchBar from '@/components/SearchBar';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { RotatingSquare } from 'react-loader-spinner';
import { FaBagShopping } from 'react-icons/fa6';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';
import StoreFooter from '@/components/StoreFooter';
import axiosClient from '@/utils/axios';

// New or Enhanced Components (conceptual - you'll create these files)
import ProductCard from '@/components/ProductCard'; // For individual product display
import CategoryFilter from '@/components/CategoryFilter'; // For category navigation
// import CartSidebar from '@/components/CartSidebar'; // For an improved cart experience
import QuickViewModal from '@/components/QuickViewModal'; // For quick product previews


// Helper function to shuffle an array (Fisher-Yates shuffle)
const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};

const StorePage = ({ storeData, storeProductsData }) => {
    const { productsData: initialProductsData } = storeProductsData; // Renamed to initialProductsData
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(
        [],
    );
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] =
        useState('All');
    const [selectedProduct, setSelectedProduct] =
        useState(null);
    const [selectedVariants, setSelectedVariants] = useState(
        [],
    );
    const [quantity, setQuantity] = useState(1);
    const [quickViewModalVisible, setQuickViewModalVisible] = useState(false); // Renamed for clarity
    const [categoryModalVisible, setCategoryModalVisible] =
        useState(false);
    const [categoryProducts, setCategoryProducts] = useState(
        [],
    );
    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); // For modal/quick view price calculation
    const [isCartOpen, setIsCartOpen] = useState(false); // Controls cart sidebar visibility


    // Debounced search to avoid excessive re-renders/API calls on every keystroke
    const handleSearch = useCallback((searchTerm) => {
        if (!searchTerm) {
            // When search term is empty, re-apply category filter or show all shuffled products
            if (selectedCategory === 'All') {
                setFilteredProducts(shuffleArray([...initialProductsData])); // Shuffle again if search is cleared
            } else {
                setFilteredProducts(
                    shuffleArray([...initialProductsData]).filter(
                        (product) => product.category && product.category.name === selectedCategory
                    )
                );
            }
            return;
        }
        const results = shuffleArray([...initialProductsData]).filter(product => // Shuffle before filtering for search
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.category && product.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredProducts(results);
    }, [initialProductsData, selectedCategory]);


    const addToCart = (productToAdd) => {
        // Determine the item's price and ID based on whether it has variants or not
        let itemPrice = productToAdd.price;
        let itemIdentifier = productToAdd._id; // Base product ID

        let newCartItem = { ...productToAdd };

        if (selectedVariants.length > 0 && productToAdd.variants?.length > 0) {
            // Logic for adding selected variants
            selectedVariants.forEach(variant => {
                const existingItemIndex = cart.findIndex(
                    (cartItem) => cartItem._id === productToAdd._id && cartItem.variant?._id === variant._id
                );

                const itemWithVariant = {
                    ...productToAdd,
                    variant: variant,
                    quantity: variant.quantity,
                    price: variant.price // Use variant price for calculation
                };

                if (existingItemIndex !== -1) {
                    const newCart = [...cart];
                    newCart[existingItemIndex].quantity += variant.quantity;
                    setCart(newCart);
                    toast.success('Item quantity updated in cart!');
                } else {
                    setCart((prevCart) => [...prevCart, itemWithVariant]);
                    toast.success('Item added to cart!');
                }
            });
        } else {
            // Logic for adding a simple product
            const existingItemIndex = cart.findIndex(
                (cartItem) => cartItem._id === productToAdd._id
            );

            if (existingItemIndex !== -1) {
                const newCart = [...cart];
                newCart[existingItemIndex].quantity += quantity;
                setCart(newCart);
                toast.success('Item quantity updated in cart!');
            } else {
                setCart((prevCart) => [...prevCart, { ...productToAdd, quantity }]);
                toast.success('Item added to cart!');
            }
        }

        setIsCartOpen(true); // Open cart sidebar on add
        setQuickViewModalVisible(false); // Close quick view modal
        setQuantity(1); // Reset quantity for next selection
        setSelectedVariants([]); // Reset selected variants
        setTotalPrice(0); // Reset total price for next selection
    };

    const handleVariantChange = useCallback((index, variantId, qty) => {
        setSelectedVariants(prevVariants => {
            const newSelectedVariants = [...prevVariants];
            const variant = selectedProduct.variants.find(v => v._id === variantId);
            if (variant) {
                newSelectedVariants[index] = { ...variant, quantity: qty };
            }
            // Recalculate total price for the modal
            const newTotalPrice = newSelectedVariants.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
            setTotalPrice(newTotalPrice);
            return newSelectedVariants;
        });
    }, [selectedProduct]);

    const handleQuantityChange = useCallback((newQuantity) => {
        setQuantity(newQuantity);
        if (selectedProduct && selectedProduct.variants?.length === 0) {
            setTotalPrice(selectedProduct.price * newQuantity);
        }
    }, [selectedProduct]);

    const addNewVariantSelection = () => {
        if (selectedProduct?.variants?.length > 0) {
            setSelectedVariants(prevVariants => [
                ...prevVariants,
                { ...selectedProduct.variants[0], quantity: 1 }
            ]);
        }
    };

    const removeVariantSelection = (index) => {
        setSelectedVariants(prevVariants => {
            const newSelectedVariants = [...prevVariants];
            newSelectedVariants.splice(index, 1);
            // Recalculate total price for the modal
            const newTotalPrice = newSelectedVariants.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
            setTotalPrice(newTotalPrice);
            return newSelectedVariants;
        });
    };

    // Fetch categories on storeData change
    useEffect(() => {
        async function fetchCategory() {
            try {
                const response = await axiosClient.get(`/category/${storeData?._id}`);
                setCategories(response.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
                toast.error('Failed to load categories');
            }
        }
        if (storeData?._id) {
            fetchCategory();
        }
    }, [storeData?._id]);


    // Initial shuffle and subsequent filtering based on category or service type
    useEffect(() => {
        if (!initialProductsData || initialProductsData.length === 0) {
            setFilteredProducts([]);
            return;
        }

        let productsToFilter = shuffleArray([...initialProductsData]); // Always start with a fresh shuffle of ALL initial products

        if (storeData?.serviceType !== 'services') {
            if (selectedCategory === 'All') {
                setFilteredProducts(productsToFilter);
            } else {
                setFilteredProducts(
                    productsToFilter.filter(
                        (product) => product.category && product.category.name === selectedCategory
                    )
                );
            }
        } else {
            // For services, the category selection triggers a modal, not direct filtering on the main page
            // So, for the main display, we want all services shuffled
            setFilteredProducts(productsToFilter);
        }
    }, [selectedCategory, initialProductsData, storeData?.serviceType]); // Depend on initialProductsData

    const handleCategorySelect = useCallback((categoryName) => {
        if (storeData?.serviceType === 'services') {
            const productsInSelectedCategory = initialProductsData.filter( // Filter from initial, unshuffled data
                (product) => product.category && product.category.name === categoryName
            );
            setCategoryProducts(shuffleArray([...productsInSelectedCategory])); // Shuffle products in the category modal
            setSelectedCategory(categoryName); // Keep track of the selected category
            setCategoryModalVisible(true); // Open modal for service categories
        } else {
            // For products, toggle the category selection
            setSelectedCategory(prevCategory =>
                prevCategory === categoryName ? 'All' : categoryName
            );
        }
    }, [initialProductsData, storeData?.serviceType]);


    // Handle product click for quick view
    const handleProductClick = useCallback((product) => {
        setSelectedProduct(product);
        setQuantity(1); // Reset quantity
        setSelectedVariants(product.variants?.length > 0 ? [{ ...product.variants[0], quantity: 1 }] : []); // Pre-select first variant if available
        setTotalPrice(product.variants?.length > 0 ? product.variants[0].price : product.price); // Set initial price
        setQuickViewModalVisible(true);
    }, []);

    // Loading and Error States
    if (error) {
        return (
            <div className="min-h-screen max-w-3xl mx-auto flex justify-center items-center">
                <StoreCard /> {/* Placeholder for error display */}
                <p className="text-red-500 text-lg">Error loading store data. Please try again later.</p>
            </div>
        );
    }

    if (!storeData || !storeProductsData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <RotatingSquare
                    height="100"
                    width="100"
                    color={storeData?.themeColor || '#4fa94d'}
                    ariaLabel="rotating-square-loading"
                    strokeWidth="4"
                    visible={true}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <StoreNavbar
                storeData={storeData}
                cart={cart}
                setCart={setCart}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
            />

            <main className="flex-grow container max-w-7xl mx-auto py-20 px-4">
                {/* Store Banner/Header Section */}
                {storeData?.storeBanner ? (
                    <div className="mb-8 rounded-xl overflow-hidden shadow-md">
                        <img
                            src={storeData?.storeBanner}
                            alt={`${storeData?.name} banner`}
                            className="w-full h-48 md:h-[26rem] object-cover"
                        />
                    </div>
                ) : (
                    <div
                        className="py-10 md:py-20 px-5 md:px-0 rounded-xl shadow-sm mb-8 text-center"
                        style={{
                            backgroundColor: storeData?.themeColor || '#f1f1f1',
                            color: storeData?.themeColor ? '#f1f1f1' : '#121212',
                        }}
                    >
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fadeIn">
                            Welcome to {storeData?.name}
                        </h1>
                        <p className="text-md md:text-lg opacity-90">
                            {storeData?.description}
                        </p>
                    </div>
                )}

                {/* Search and Category Filters */}
                <div className="mb-8 flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-grow w-full md:w-auto">
                         <SearchBar
                            items={initialProductsData} // Pass the original, unshuffled data to search bar
                            onSearch={handleSearch}
                            storeData={storeData}
                            placeholder={`Search products...`}
                        />
                    </div>

                    <div className="w-full md:w-auto overflow-x-auto">
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={handleCategorySelect}
                            serviceType={storeData?.serviceType}
                            themeColor={storeData?.themeColor}
                        />
                    </div>
                </div>

                {/* Product/Service Listing */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                       Our Catalogue
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {filteredProducts?.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    storeLink={storeData?.storeLink}
                                    serviceType={storeData?.serviceType}
                                    themeColor={storeData?.themeColor}
                                    onQuickView={handleProductClick}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16">
                                <FaBagShopping className="mx-auto text-6xl text-gray-300 mb-6" />
                                <p className="text-gray-500 text-lg font-medium">
                                    No {storeData?.serviceType === 'services' ? 'services' : 'products'} found in this category.
                                </p>
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className="mt-4 text-blue-600 hover:underline"
                                >
                                    View All {storeData?.serviceType === 'services' ? 'Services' : 'Products'}
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Quick View Modal */}
            {quickViewModalVisible && selectedProduct && (
                <QuickViewModal
                    product={selectedProduct}
                    quantity={quantity}
                    setQuantity={handleQuantityChange}
                    selectedVariants={selectedVariants}
                    handleVariantChange={handleVariantChange}
                    addNewVariantSelection={addNewVariantSelection}
                    removeVariantSelection={removeVariantSelection}
                    totalPrice={totalPrice}
                    addToCart={() => addToCart(selectedProduct)}
                    onClose={() => setQuickViewModalVisible(false)}
                    storeThemeColor={storeData?.themeColor}
                />
            )}

            {/* Category Products Modal (for services - still useful for detailed view) */}
            {categoryModalVisible && storeData?.serviceType === 'services' && (
                <Modal
                    onClose={() => setCategoryModalVisible(false)}
                    title={`Services in ${selectedCategory}`}
                >
                    <div className="max-h-[70vh] overflow-y-auto p-4">
                        {categoryProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {categoryProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className="flex items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                                        onClick={() =>
                                            router.push(`/store/${storeData?.storeLink}/product/${product?._id}`)
                                        }
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-24 h-24 object-cover rounded-md mr-4 flex-shrink-0"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-base">{product.name}</h3>
                                            <p className="text-gray-600 text-sm">
                                                ₦{' '}
                                                {new Intl.NumberFormat('en-US').format(product.price)}
                                            </p>
                                            {product.description && (
                                                <p className="text-gray-500 text-xs line-clamp-2">
                                                    {product.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <FaBagShopping className="mx-auto text-4xl text-gray-300 mb-4" />
                                <p className="text-gray-500">
                                    No services found in this category.
                                </p>
                            </div>
                        )}
                    </div>
                </Modal>
            )}

            {/* Cart Sidebar */}
            {/* <CartSidebar
                cart={cart}
                setCart={setCart}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                storeData={storeData}
            /> */}

            <StoreFooter storeData={storeData} />
        </div>
    );
};

export default StorePage;