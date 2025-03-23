import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';
import ConnectWalletButton from './ConnectWalletButton';
import { shortAddress } from '../../utils/format';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { account } = useWallet();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-bold text-blue-600">Nexus3D</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/' ? 'border-blue-500' : 'border-transparent'
                } text-sm font-medium ${isActive('/')}`}
              >
                Home
              </Link>
              <Link
                to="/create"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/create' ? 'border-blue-500' : 'border-transparent'
                } text-sm font-medium ${isActive('/create')}`}
              >
                Create
              </Link>
              <Link
                to="/marketplace"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/marketplace' ? 'border-blue-500' : 'border-transparent'
                } text-sm font-medium ${isActive('/marketplace')}`}
              >
                Marketplace
              </Link>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {account ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md ${
                    location.pathname === '/profile'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {shortAddress(account)}
                </Link>
                <ConnectWalletButton />
              </div>
            ) : (
              <ConnectWalletButton />
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === '/'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            } text-base font-medium`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === '/create'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            } text-base font-medium`}
            onClick={closeMenu}
          >
            Create
          </Link>
          <Link
            to="/marketplace"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === '/marketplace'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            } text-base font-medium`}
            onClick={closeMenu}
          >
            Marketplace
          </Link>
          {account && (
            <Link
              to="/profile"
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                location.pathname === '/profile'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              } text-base font-medium`}
              onClick={closeMenu}
            >
              Profile
            </Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="ml-3">
              {account ? (
                <div className="text-base font-medium text-gray-800">{shortAddress(account)}</div>
              ) : (
                <div className="text-base font-medium text-gray-800">Not connected</div>
              )}
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <div className="px-4 py-2">
              <ConnectWalletButton fullWidth />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 