import React from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { shortenAddress } from '../../utils/format';

const ConnectWalletButton = ({ size = 'md', showAddress = true, className = '' }) => {
  const { account, connectWallet, disconnect, isLoading } = useWallet();
  
  // Size class mapping
  const sizeClassMap = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base'
  };
  
  const buttonSizeClass = sizeClassMap[size] || sizeClassMap.md;
  
  // If wallet is connected
  if (account) {
    return (
      <div className={`flex items-center ${className}`}>
        {showAddress && (
          <span className="mr-2 text-gray-700 dark:text-gray-300 font-medium">
            {shortenAddress(account)}
          </span>
        )}
        <button
          onClick={disconnect}
          className={`${buttonSizeClass} inline-flex items-center border border-transparent font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 focus:outline-none`}
        >
          Disconnect
        </button>
      </div>
    );
  }
  
  // Wallet not connected
  return (
    <button
      onClick={connectWallet}
      disabled={isLoading}
      className={`${buttonSizeClass} inline-flex items-center border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 ${className}`}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connecting...
        </>
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
};

export default ConnectWalletButton; 