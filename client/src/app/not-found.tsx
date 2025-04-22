// pages/404.tsx
import Link from 'next/link';

export default function NotFound() {
 return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-6">
        
        {/* can use image  */}

        <h1 className="text-4xl font-extrabold text-red-500">404</h1>
        <p className="text-lg font-semibold text-gray-700">Page not found</p>
        <p className="text-sm text-gray-500">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 bg-blue-600 text-white text-sm px-6 py-2 rounded-full shadow hover:bg-blue-500 transition-all duration-200"
        >
          Go to Home Page 
        </Link>
      </div>
    </div>
  );

}
