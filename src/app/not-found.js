"use client";

import Link from "next/link";
import Head from "next/head";

// export const metadata = {
//     title: 'Page Not Found',
//   };

export default function NotFound() {
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
        <p className="mt-2 text-lg text-gray-500">
          The page you are looking for does not exist.
        </p>
        <Link
          href={"/"}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}
