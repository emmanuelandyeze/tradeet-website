import { NextRequest, NextResponse } from 'next/server';

export function middleware(req) {
	const host = req.headers.get('host') || '';
	const pathname = req.nextUrl.pathname;

	// Extract subdomain
	const [subdomain] = host.split('.');

	// If it's the main domain or 'www', allow normal routing
	if (host === 'tradeet.ng' || host === 'www.tradeet.ng') {
		return NextResponse.next();
	}

	// If request is already a store path like /store/xyz, prevent mismatches
	if (pathname.startsWith('/store')) {
		return NextResponse.rewrite(new URL('/', req.url)); // Redirect back to home
	}

	// Rewrite requests to go to the correct store page dynamically
	req.nextUrl.pathname = `/store/${subdomain}${pathname}`;
	return NextResponse.rewrite(req.nextUrl);
}
