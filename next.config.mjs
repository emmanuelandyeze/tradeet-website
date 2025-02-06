export default {
	experimental: {
		appDir: true,
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
				],
			},
		];
	},
	async rewrites() {
		return [
			{
				source: '/',
				destination: '/store', // Route subdomains to store pages
			},
		];
	},
};
