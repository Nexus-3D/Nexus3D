import React, { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { shortAddress } from '../../utils/format';

/**
 * Button component for connecting to Web3 wallet
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {string} props.className - Additional CSS classes
 */
const ConnectWalletButton = ({ fullWidth = false, className = '' }) => {
  const { account, connect, disconnect, isConnecting } = useWallet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleConnect = async () => {
    try {
      await connect();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };
  
  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  // Combined classes
  const buttonClasses = `
    inline-flex items-center justify-center px-4 py-2 border border-transparent 
    text-sm font-medium rounded-md shadow-sm 
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  // Button content changes based on connection state
  if (isConnecting) {
    return (
      <button 
        className={`${buttonClasses} bg-gray-300 text-gray-700 cursor-not-allowed`}
        disabled
      >
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" 
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
        Connecting...
      </button>
    );
  }
  
  // Already connected - show dropdown with account and disconnect option
  if (account) {
    return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className={`${buttonClasses} bg-blue-100 text-blue-800 hover:bg-blue-200`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          {shortAddress(account)}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(account);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Copy Address
              </button>
              <button
                onClick={handleDisconnect}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                role="menuitem"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Not connected - show connect button
  return (
    <button
      onClick={handleConnect}
      className={`${buttonClasses} bg-blue-600 text-white hover:bg-blue-700`}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton; 