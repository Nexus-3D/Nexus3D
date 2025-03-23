import React from 'react';

/**
 * A reusable loading spinner component with configurable size and color
 * 
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the spinner (small, medium, large)
 * @param {string} props.color - Color of the spinner (blue, gray, white, purple)
 * @param {string} props.text - Optional loading text to display
 * @param {boolean} props.fullPage - Whether to display as a full page overlay
 */
const LoadingSpinner = ({ size = 'medium', color = 'blue', text, fullPage = false }) => {
  // Determine spinner size
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };
  
  // Determine spinner color
  const colorClasses = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    white: 'text-white',
    purple: 'text-purple-600'
  };
  
  // Determine text size
  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };
  
  const spinnerSize = sizeClasses[size] || sizeClasses.medium;
  const spinnerColor = colorClasses[color] || colorClasses.blue;
  const textSize = textSizeClasses[size] || textSizeClasses.medium;
  
  const spinner = (
    <svg 
      className={`animate-spin ${spinnerSize} ${spinnerColor}`} 
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
  );
  
  // Full page overlay spinner
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="flex flex-col items-center bg-white p-5 rounded-lg shadow-lg">
          {spinner}
          {text && <p className={`mt-3 ${textSize} text-gray-700`}>{text}</p>}
        </div>
      </div>
    );
  }
  
  // Regular spinner with optional text
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center">
        {spinner}
        {text && <p className={`mt-2 ${textSize} ${spinnerColor}`}>{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;