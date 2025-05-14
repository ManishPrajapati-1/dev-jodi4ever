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
        remotePatterns: [new URL('http://65.1.117.252:5002/**')],
      },
};

export default nextConfig;
