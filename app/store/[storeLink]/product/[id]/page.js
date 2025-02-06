import StorePage from '@/components/StorePage';
import {
	getStoreData,
	getStoreProduct,
	getStoreProductsData,
} from '@/app/lib/api';
import { Suspense } from 'react';
import ProductPage from '@/components/ProductPage';
// import { RotatingSquare } from 'react-loader-spinner';

const Page = async ({ params }) => {
	const { id, storeLink } = params;
	// console.log(storeLink);
	const productData = await getStoreProduct(id);
	const storeData = await getStoreData(storeLink);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ProductPage
				productData={productData}
				storeData={storeData}
			/>
		</Suspense>
	);
};

export async function generateMetadata({ params }) {
	const { id, storeLink } = params;
	const productData = await getStoreProduct(id);
	const storeData = await getStoreData(storeLink);

	return {
		title: `${
			productData
				? productData.name + ' - ' + storeData.name
				: 'Tradeet Store'
		}`,
		description: productData
			? `${productData.name}`
			: 'Welcome to Tradeet',
		icons: {
			icon: storeData ? storeData.logo : '',
		},
	};
}

export default Page;
