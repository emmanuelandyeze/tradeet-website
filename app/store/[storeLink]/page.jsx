import StorePage from '@/components/StorePage';
import {
	getStoreData,
	getStoreProductsData,
} from '@/app/lib/api';
import { Suspense } from 'react';

const Page = async ({ params }) => {
	const { storeLink } = params;

	// Fetch store data on the server
	const storeData = await getStoreData(storeLink);

	// If store doesn't exist, return a 404-like page
	if (!storeData) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-3xl font-semibold text-red-500">
					Store Not Found
				</h1>
				<p className="text-gray-600 mt-2">
					Sorry, the store you are looking for does not
					exist.
				</p>
			</div>
		)
	} else if (storeData.storeLink === "fastmeal") {
		// Redirect to Fastmeal's official page for now
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-3xl font-semibold text-red-500">
                    Welcome to Fastmeal...
                </h1>
                <p className="text-gray-600 mt-2">
                    Apologies we are currently closed for the day. See you tomorrow!
                </p>
                
            </div>
        );
	}

	// Fetch store products
	const storeProductsData = await getStoreProductsData(
		storeData,
	);

	return (
		<Suspense
			fallback={
				<p className="text-center text-gray-500">
					Loading store...
				</p>
			}
		>
			<StorePage
				storeData={storeData}
				storeProductsData={storeProductsData}
			/>
		</Suspense>
	);
};

export async function generateMetadata({ params }) {
	const { storeLink } = params;
	console.log(storeLink);

	try {
		const storeData = await getStoreData(storeLink);

		return {
			title: storeData.name,
			description: storeData
				? `Welcome to ${storeData.name}`
				: 'Welcome to Tradeet',
			// Adding OpenGraph metadata
			openGraph: {
				title: storeData.name,
				description: `Welcome to ${storeData.name}`,
				url: `https://tradeet.ng/store/${storeLink}`, // Adjust the URL format as needed
				images: [
					{
						url: storeData.logoUrl, // Store banner image
						width: 1200,
						height: 630,
						alt: storeData.name,
					},
				],
				type: 'website',
			},
			// Adding Twitter Card metadata for better social sharing
			twitter: {
				card: 'summary_large_image',
				title: storeData.name,
				description: `Welcome to ${storeData.name}`,
				images: [storeData.logoUrl], // Store banner image
			},
		};
	} catch (error) {
		console.error('Error generating metadata:', error);
		return {
			title: 'Tradeet Store',
			description: 'Welcome to Tradeet',
			openGraph: {
				title: 'Tradeet Store',
				description: 'Welcome to Tradeet',
				url: 'https://tradeet.ng',
				images: [
					{
						url: 'https://tradeet.ng/default-banner.jpg', // Provide a default image
						width: 1200,
						height: 630,
						alt: 'Tradeet Store',
					},
				],
				type: 'website',
			},
			twitter: {
				card: 'summary_large_image',
				title: 'Tradeet Store',
				description: 'Welcome to Tradeet',
				images: ['https://tradeet.ng/default-banner.jpg'], // Default image
			},
		};
	}
}


export default Page;
