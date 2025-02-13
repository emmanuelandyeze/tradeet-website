import { NextRequest, NextResponse } from 'next/server';

export function middleware(req) {
	const host = req.headers.get('host') || '';
	const subdomain = host.split('.')[0]; // Extract subdomain

	if (subdomain !== 'tradeet' && subdomain !== 'www') {
		const url = req.nextUrl.clone();
		url.pathname = `/store/${subdomain}`; // Redirect to the correct store route
		return NextResponse.rewrite(url);
	}

	return NextResponse.next();
}
