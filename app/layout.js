import {
	Inter,
	Poppins,
	Lora,
	Open_Sans,
} from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	weight: [
		'100',
		'200',
		'300',
		'400',
		'500',
		'600',
		'700',
		'800',
		'900',
	],
});

const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: [
		'100',
		'200',
		'300',
		'400',
		'500',
		'600',
		'700',
		'800',
		'900',
	],
});

const openSans = Open_Sans({
	subsets: ['latin'],
	variable: '--font-opensans',
	weight: ['300', '400', '500', '600', '700', '800'],
});

const lora = Lora({
	subsets: ['latin'],
	variable: '--font-lora',
	weight: ['400', '500', '600', '700'],
});

export const metadata = {
	title:
		'Tradeet Business – Manage Inventory, Finances & Marketing',
	description:
		'Tradeet is an all-in-one business management app for freelancers and small business owners. Track inventory, automate invoicing, build your online presence, and market your brand with ease.',
	keywords:
		'business management app, inventory tracking for small businesses, best finance tools for freelancers, marketing automation for e-commerce, all-in-one business solution, online store builder, invoice and expense tracking app, small business growth tools, WhatsApp marketing software',
	author: 'Tradeet Business',
	image: 'https://tradeet.ng/images/logo.png',
	openGraph: {
		title:
			'Tradeet Business – Manage Inventory, Finances & Marketing',
		description:
			'Tradeet is an all-in-one business management app for freelancers and small business owners. Track inventory, automate invoicing, build your online presence, and market your brand with ease.',
		keywords:
			'business management app, inventory tracking for small businesses, best finance tools for freelancers, marketing automation for e-commerce, all-in-one business solution, online store builder, invoice and expense tracking app, small business growth tools, WhatsApp marketing software',
		image: 'https://www.tradeet.ng/images/logo.png',
		url: 'https://www.tradeet.ng',
		type: 'website',
	},
};



export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<title>{metadata.title}</title>
				<meta
					name="description"
					content={metadata.description}
				/>
				<meta name="keywords" content={metadata.keywords} />
				<meta name="author" content={metadata.author} />
				<meta name="viewport" content={metadata.viewport} />
			</head>
			<body
				className={` ${openSans.className} antialiased`}
			>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
