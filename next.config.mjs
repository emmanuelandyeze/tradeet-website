export default {
	async rewrites() {
		return [
			{
				source: '/:path*',
				has: [
					{
						type: 'host',
						value: '([a-zA-Z0-9-]+)\\.tradeet\\.ng',
					},
				], // Correct regex for subdomains
				destination: '/store/:path*', // Redirect subdomains to /store/{subdomain}
			},
		];
	},
};
