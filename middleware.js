import { NextRequest, NextResponse } from 'next/server';

export function middleware(req) {
	const host = req.headers.get('host') || '';
	const subdomain = host.split('.')[0];

	// Ignore main domain (tradeet.ng) and www
	if (host === 'tradeet.ng' || host === 'www.tradeet.ng') {
		return NextResponse.next();
	}

	// Redirect all subdomains (excluding main domain) to store pages
	const url = req.nextUrl.clone();
	url.pathname = `/store/${subdomain}`;
	return NextResponse.rewrite(url);
}
