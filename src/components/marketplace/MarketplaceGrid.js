import React from 'react';
import AssetCard from './AssetCard';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Grid component for displaying marketplace assets
 * 
 * @param {Object} props - Component props
 * @param {Array} props.assets - Array of assets to display
 * @param {boolean} props.isLoading - Whether assets are loading
 * @param {string} props.error - Error message if asset loading failed
 * @param {boolean} props.isOwner - Whether the current user is the owner
 */
const MarketplaceGrid = ({ assets = [], isLoading = false, error = null, isOwner = false }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="large" color="blue" text="Loading assets..." />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <svg 
            className="w-8 h-8 text-red-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Failed to load assets</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try again
        </button>
      </div>
    );
  }
  
  if (assets.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg 
            className="w-8 h-8 text-gray-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No assets found</h3>
        <p className="text-gray-500 dark:text-gray-400">
          {isOwner 
            ? "You don't have any assets yet. Create your first 3D asset!"
            : "No assets match your current filters. Try adjusting your search criteria."}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {assets.map((asset) => (
        <AssetCard 
          key={asset.id || asset.tokenId} 
          asset={asset} 
          isOwner={isOwner || asset.owner === asset.currentAccount}
        />
      ))}
    </div>
  );
};

export default MarketplaceGrid; 