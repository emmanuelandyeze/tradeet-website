import { NextResponse } from 'next/server';

export function middleware(req) {
	const { nextUrl } = req;
	const hostname = req.headers.get('host') || '';

	if (hostname.endsWith('tradeet.ng')) {
		const subdomain = hostname.split('.')[0]; // Extract subdomain (storename)

		if (subdomain !== 'tradeet') {
			nextUrl.pathname = `/store/${subdomain}`; // Redirect to store page
			return NextResponse.rewrite(nextUrl);
		}
	}

	return NextResponse.next();
}
