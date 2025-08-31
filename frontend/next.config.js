/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    experimental: {
        serverActions: true,
    },

    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://backend:3001',
    },

    trailingSlash: false,

    images: {
        domains: ['your-cdn.com', 'localhost'],
    },

    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

    webpack: (config) => {
        config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');
        config.resolve.alias['@lib'] = path.resolve(__dirname, 'src/lib');
        config.resolve.alias['@hooks'] = path.resolve(__dirname, 'src/hooks');
        return config;
    },

    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };
        return config;
    },
};

module.exports = nextConfig;
