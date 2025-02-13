export default {
	async rewrites() {
		return [
			{
				source: '/',
				has: [{ type: 'host', value: '*.tradeet.ng' }],
				destination: '/store/:path*', // Redirect subdomains to /store/{subdomain}
			},
		];
	},
};
