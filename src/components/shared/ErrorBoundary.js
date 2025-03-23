import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center">
              <svg 
                className="mx-auto h-12 w-12 text-red-500 dark:text-red-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
              <h2 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Application Error</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                We're sorry, the application has encountered an error. Please try refreshing the page or returning to the homepage.
              </p>
            </div>
            
            <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="flex flex-col items-center">
                <Link 
                  to="/" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  Return to Home
                </Link>
                
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                >
                  Refresh Page
                </button>
                
                {this.props.showDetails && this.state.error && (
                  <div className="mt-6 w-full">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Error Details:</p>
                    <pre className="mt-2 p-4 text-xs bg-gray-100 dark:bg-gray-900 rounded overflow-auto text-red-500 dark:text-red-400">
                      {this.state.error.toString()}
                      {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary; 