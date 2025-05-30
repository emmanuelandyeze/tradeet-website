import { NextRequest, NextResponse } from 'next/server';

export function middleware(req) {
	const host = req.headers.get('host') || '';
	const subdomain = host.split('.')[0];

	// Ignore the main domain, www, and localhost
	if (
		host === 'tradeet.ng' ||
		host === 'www.tradeet.ng' ||
		host === 'localhost:3000' ||
		host === '192.168.247.140:3000' ||
		host.startsWith('localhost:') // Catch all localhost ports
	) {
		return NextResponse.next();
	}

	// Allow static assets like JS, CSS, and images to load properly
	const pathname = req.nextUrl.pathname;
	if (
		pathname.startsWith('/_next') || // Next.js assets
		pathname.startsWith('/static') || // Static files
		pathname.startsWith('/favicon') || // Favicon
		pathname.startsWith('/api') ||
		pathname.startsWith('/store')
	) {
		return NextResponse.next();
	}

	// Rewrite subdomains to their respective store pages
	const url = req.nextUrl.clone();
	url.pathname = `/store/${subdomain}`;
	return NextResponse.rewrite(url);
}
