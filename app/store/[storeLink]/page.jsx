// app/store/[storeLink]/page.jsx
import StorePage from '@/components/StorePage';
import { getStoreData, getStoreProductsData } from '@/app/lib/api';
import { Suspense } from 'react';
import Link from 'next/link';
import { FaExclamationTriangle, FaStore } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';

// Import the WhatsAppContact as a client component
import WhatsAppContact from '@/components/WhatsAppContact'; // <--- UPDATED IMPORT

// --- Page Component (Server Component) ---
const Page = async ({ params }) => {
    const { storeLink } = params;

    let storeData = null;
    let storeProductsData = null;
    let errorFetchingStore = false;
    let errorFetchingProducts = false;

    try {
        storeData = await getStoreData(storeLink);

        if (!storeData) {
            // If store doesn't exist, return a dedicated 404-like page
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
                    <FaStore className="text-red-500 text-6xl mb-6" />
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Store Not Found</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Oops! The store you're looking for doesn't seem to exist or has been removed.
                    </p>
                    <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors text-lg font-medium">
                        Go to Home
                    </Link>
                </div>
            );
        }
    } catch (error) {
        console.error(`Error fetching store data for ${storeLink}:`, error);
        errorFetchingStore = true; // Flag for a network/server error with the store
    }

    // Only try to fetch products if storeData was successfully retrieved
    if (storeData && !errorFetchingStore) {
        try {
            storeProductsData = await getStoreProductsData(storeData);
        } catch (error) {
            console.error(`Error fetching products for ${storeLink}:`, error);
            errorFetchingProducts = true; // Flag for error with products
        }
    }

    // Handle generic fetching errors (e.g., API is down)
    if (errorFetchingStore) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
                <FaExclamationTriangle className="text-orange-500 text-6xl mb-6" />
                <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Something Went Wrong</h1>
                <p className="text-lg text-gray-600 mb-8">
                    We couldn't load the store details right now. Please try again later.
                </p>
                <button
                    onClick={() => window.location.reload()} // Simple reload to retry
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors text-lg font-medium"
                >
                    Reload Page
                </button>
            </div>
        );
    }

    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="flex flex-col items-center">
                        <BiLoaderAlt className="animate-spin text-4xl text-gray-400 mb-4" />
                        <p className="text-lg text-gray-600">Loading store items...</p>
                    </div>
                </div>
            }
        >
            <StorePage
                storeData={storeData}
                storeProductsData={storeProductsData}
                errorFetchingProducts={errorFetchingProducts} // Pass error flag if needed by StorePage
            />
            {/* Render the WhatsAppContact Client Component */}
            <WhatsAppContact storeData={storeData} /> {/* <--- CORRECTED USAGE */}
        </Suspense>
    );
};

// --- Metadata Generation (Server Component) ---
export async function generateMetadata({ params }) {
    const { storeLink } = params;

    try {
        const storeData = await getStoreData(storeLink);

        const title = storeData?.name || 'Tradeet Store';
        const description = storeData?.description || 'Discover a variety of products and services on Tradeet.';
        const imageUrl = storeData?.storeBanner || storeData?.logoUrl || 'https://tradeet.ng/default-banner.jpg';
        const pageUrl = `https://tradeet.ng/store/${storeLink}`;

        return {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: pageUrl,
                images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
                type: 'website',
                siteName: 'Tradeet',
                locale: 'en_NG',
            },
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: description,
                images: [imageUrl],
                creator: '@tradeet',
            },
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                    index: true,
                    follow: true,
                    noimageindex: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Tradeet Store - Discover Great Deals',
            description: 'Explore a wide range of products and services on Tradeet. Your ultimate online marketplace.',
            openGraph: {
                title: 'Tradeet Store',
                description: 'Explore a wide range of products and services on Tradeet.',
                url: 'https://tradeet.ng',
                images: [
                    {
                        url: 'https://tradeet.ng/default-banner.jpg',
                        width: 1200,
                        height: 630,
                        alt: 'Tradeet',
                    },
                ],
                type: 'website',
                siteName: 'Tradeet',
                locale: 'en_NG',
            },
            twitter: {
                card: 'summary_large_image',
                title: 'Tradeet Store',
                description: 'Explore a wide range of products and services on Tradeet.',
                images: ['https://tradeet.ng/default-banner.jpg'],
                creator: '@tradeet',
            },
        };
    }
}

export default Page;