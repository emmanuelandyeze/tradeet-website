import { NextResponse } from 'next/server';

export function middleware(req) {
	const { nextUrl } = req;
	const hostname = req.headers.get('host') || '';

	// Ignore requests to the main domain
	if (
		hostname === 'tradeet.ng' ||
		hostname.startsWith('www.')
	) {
		return NextResponse.next();
	}

	// Extract subdomain (e.g., "storename" from "storename.tradeet.ng")
	const domainParts = hostname.split('.');
	if (domainParts.length > 2) {
		const storeName = domainParts[0];

		// Rewrite only subdomains to their respective store pages
		return NextResponse.rewrite(
			new URL(`/store/${storeName}`, nextUrl),
		);
	}

	return NextResponse.next();
}

const config = {
	matcher: '/:path*',
};

export default config;
