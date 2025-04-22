// pages/_error.tsx
'use client'
import { NextPageContext } from 'next';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-5xl font-bold text-red-500 mb-4">
          {statusCode || 'Error'}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An unexpected error occurred'}
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-400 transition duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};

export default ErrorPage;
