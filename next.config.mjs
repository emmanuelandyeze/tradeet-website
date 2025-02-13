export default {
	experimental: {
		appDir: true,
	},
	async rewrites() {
		return [
			{
				source: '/',
				has: [{ type: 'host', value: '*.tradeet.ng' }],
				destination: '/store',
			},
		];
	},
};
