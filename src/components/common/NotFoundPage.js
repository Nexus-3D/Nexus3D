import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFoundPage component for displaying 404 errors
 */
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="mb-8">
        <svg 
          className="mx-auto h-24 w-24 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round"
            strokeWidth="2" 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">404</h1>
      <h2 className="mt-2 text-xl font-semibold text-gray-700 dark:text-gray-300">Page Not Found</h2>
      <p className="mt-4 text-base text-gray-500 dark:text-gray-400 max-w-md">
        Sorry, we couldn't find the page you're looking for. The URL may be misspelled or the page you're looking for is no longer available.
      </p>
      
      <div className="mt-10 flex space-x-4">
        <Link
          to="/"
          className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go back home
        </Link>
        <Link
          to="/marketplace"
          className="inline-flex items-center px-5 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Explore marketplace
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 