import React from 'react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  // Size mapping
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };
  
  const spinnerSize = sizeMap[size] || sizeMap.md;
  
  return (
    <div className="flex flex-col items-center justify-center">
      <svg 
        className={`animate-spin ${spinnerSize} text-indigo-600 dark:text-indigo-400`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {message && (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{message}</p>
      )}
    </div>
  );
};

// Full screen loading animation with background
export const FullScreenLoading = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 z-50">
      <LoadingSpinner size="lg" message={message} />
    </div>
  );
};

export default LoadingSpinner; 