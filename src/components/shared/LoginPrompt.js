import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';

const LoginPrompt = ({ message = 'Please connect your wallet to continue' }) => {
  const { connectWallet, isLoading } = useWallet();

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Nexus3D
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Web3 Rapid 3D Scene Generation Platform
          </p>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-6">
            <svg 
              className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              Web3 Access
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
          </div>
          
          <div className="mt-6">
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </button>
            
            <div className="mt-6 flex items-center justify-center">
              <div className="text-sm">
                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>
                Nexus3D uses Web3 technology to ensure your ownership of created content.
              </p>
              <p className="mt-1">
                Connecting your wallet does not authorize any fund transfers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt; 