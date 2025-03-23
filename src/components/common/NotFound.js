import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Return Home
          </Link>
          
          <Link
            to="/marketplace"
            className="px-6 py-3 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition duration-200"
          >
            Explore Marketplace
          </Link>
        </div>
      </div>
      
      <div className="mt-12 w-full max-w-lg">
        <svg
          viewBox="0 0 600 400"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <rect x="0" y="0" width="600" height="400" fill="#f3f4f6" />
          <path
            d="M480 150L420 150L420 180L480 180L480 150Z"
            fill="#3b82f6"
          />
          <path
            d="M120 150L180 150L180 180L120 180L120 150Z"
            fill="#8b5cf6"
          />
          <path
            d="M480 120L420 120L420 90L480 90L480 120Z"
            fill="#3b82f6"
          />
          <path
            d="M120 120L180 120L180 90L120 90L120 120Z"
            fill="#8b5cf6"
          />
          <path
            d="M300 80L330 80L330 320L300 320L300 80Z"
            fill="#e5e7eb"
          />
          <path
            d="M270 80L300 80L300 320L270 320L270 80Z"
            fill="#d1d5db"
          />
          <path
            d="M300 200L480 200L480 230L300 230L300 200Z"
            fill="#3b82f6"
          />
          <path
            d="M300 200L120 200L120 230L300 230L300 200Z"
            fill="#8b5cf6"
          />
          <path
            d="M300 170L390 170L390 200L300 200L300 170Z"
            fill="#60a5fa"
          />
          <path
            d="M300 170L210 170L210 200L300 200L300 170Z"
            fill="#a78bfa"
          />
          <path
            d="M300 230L390 230L390 260L300 260L300 230Z"
            fill="#60a5fa"
          />
          <path
            d="M300 230L210 230L210 260L300 260L300 230Z"
            fill="#a78bfa"
          />
          <circle cx="300" cy="320" r="30" fill="#4b5563" />
        </svg>
      </div>
    </div>
  );
};

export default NotFound; 