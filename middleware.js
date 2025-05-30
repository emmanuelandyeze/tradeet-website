import { NextRequest, NextResponse } from 'next/server';

export function middleware(req) {
	const host = req.headers.get('host') || '';
	const pathname = req.nextUrl.pathname;

	// --- NEW LOGIC FOR HANDLING VERCEL DEPLOYMENT HOSTNAMES ---
	// If the host is not your custom domain, and it's not a static asset,
	// let the request pass through without subdomain rewriting.
	// This handles vercel.app URLs, preventing them from being treated as subdomains.
	if (
		!host.endsWith('.tradeet.ng') &&
		!host.endsWith('tradeet.ng')
	) {
		// Also ensure it's not trying to access /store on the vercel.app domain
		// if your /store route is only meant for actual subdomains.
		// If it's a Vercel preview/deployment URL, just let it load the main site or a specific route.
		// For example, if you want to access the root of your app on Vercel preview:
		if (pathname === '/') {
			return NextResponse.next();
		}
		// For other paths on Vercel preview, you might want to redirect to root or handle differently.
		// For now, let's assume if it's not your custom domain, it shouldn't try to resolve subdomains.
		if (
			pathname.startsWith('/_next') ||
			pathname.startsWith('/static') ||
			pathname.startsWith('/favicon') ||
			pathname.startsWith('/api')
		) {
			return NextResponse.next();
		}
		// Redirect non-tradeet.ng hosts to the main domain or a specific fallback if needed
		// For example, redirect all non-tradeet.ng hosts to tradeet.ng
		// return NextResponse.redirect(new URL('https://tradeet.ng', req.url));
		return NextResponse.next(); // Or you could redirect to a default page
	}
	// --- END NEW LOGIC ---

	// Ignore the main domain, www, and localhost for subdomain rewriting
	if (
		host === 'tradeet.ng' ||
		host === 'www.tradeet.ng' ||
		host.startsWith('localhost:') // Catch all localhost ports and 192.168...
	) {
		return NextResponse.next();
	}

	// Allow static assets like JS, CSS, and images to load properly
	// This check is already done above for Vercel preview hostnames, but good to keep.
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/static') ||
		pathname.startsWith('/favicon') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/store') // This is important: allows direct access to /store/some-store
	) {
		return NextResponse.next();
	}

	// Extract subdomain only if host ends with .tradeet.ng (e.g., fastmeal.tradeet.ng)
	// We already filtered out main domain and vercel.app hostnames.
	const parts = host.split('.');
	let subdomain = '';

	// This logic ensures 'subdomain' is only taken from 'sub.domain.tld'
	// where 'domain.tld' is 'tradeet.ng'
	if (
		parts.length >= 3 &&
		parts[parts.length - 2] +
			'.' +
			parts[parts.length - 1] ===
			'tradeet.ng'
	) {
		subdomain = parts[0];
	} else {
		// This case should ideally not be hit if the above checks are robust.
		// It means a hostname like 'yourdomain.com' is being processed that doesn't fit the 'tradeet.ng' pattern.
		console.warn(
			'Unexpected host format in middleware:',
			host,
		);
		return NextResponse.next(); // Or handle as an error/redirect
	}

	// Now, if a subdomain was actually found (e.g., 'fastmeal')
	if (subdomain && subdomain !== 'www') {
		// Ensure 'www' is not treated as a storeLink
		const url = req.nextUrl.clone();
		url.pathname = `/store/${subdomain}`;
		return NextResponse.rewrite(url);
	}

	// Fallback for any other cases not explicitly handled
	return NextResponse.next();
}
