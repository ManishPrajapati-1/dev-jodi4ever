/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/about',
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ]
  // },
    images: {
        remotePatterns: [new URL('https://jodi4ever.com/**')],
      },
};

export default nextConfig;
