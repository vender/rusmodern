/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL.split('//')[1],
                pathname: '/image/**',
            },
        ],
    },
}

module.exports = nextConfig
