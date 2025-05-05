/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('http://65.1.117.252:5002/**')],
      },
};

export default nextConfig;
