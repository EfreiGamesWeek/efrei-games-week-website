/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_URI: process.env.API_URI,
	},
	async rewrites() {
		return [
			{
				source: "/api/:path*", // Quand le front appelle /api/...
				destination: "https://api.efreigamesweek.fr/:path*", // Next redirige vers ton vrai back
			},
		];
	},
};

export default nextConfig;
