import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatEther, formatDate, shortAddress, formatETH } from '../../utils/format';
import { useWallet } from '../../contexts/WalletContext';
import { purchaseAsset, setAssetForSale, setAssetPrice } from '../../utils/contractService';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Card component for displaying NFT assets in marketplace and profile
 * 
 * @param {Object} props - Component props
 * @param {Object} props.asset - Asset data
 * @param {boolean} props.isOwner - Whether the current user owns this asset
 */
const AssetCard = ({ asset, isOwner = false }) => {
  const { account, provider, signer } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isForSale, setIsForSale] = useState(asset.isForSale);
  const [price, setPrice] = useState(asset.price);
  const [isEditing, setIsEditing] = useState(false);
  
  // Handle purchase
  const handlePurchase = async () => {
    if (!account || !signer) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await purchaseAsset(asset.id, signer, price);
      
      setSuccess('Asset purchased successfully!');
      setLoading(false);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error purchasing asset:', err);
      setError('Failed to purchase. Please try again.');
      setLoading(false);
    }
  };
  
  // Handle toggling for sale status
  const handleToggleForSale = async () => {
    if (!account || !signer) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const newStatus = !isForSale;
      const result = await setAssetForSale(asset.id, newStatus, signer);
      
      setIsForSale(newStatus);
      setSuccess(`Asset ${newStatus ? 'listed for sale' : 'unlisted'} successfully!`);
      setLoading(false);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error updating for sale status:', err);
      setError('Failed to update listing status. Please try again.');
      setLoading(false);
    }
  };
  
  // Handle price update
  const handleUpdatePrice = async (e) => {
    e.preventDefault();
    
    if (!account || !signer) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await setAssetPrice(asset.id, price, signer);
      
      setSuccess('Price updated successfully!');
      setLoading(false);
      setIsEditing(false);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error updating price:', err);
      setError('Failed to update price. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Thumbnail container */}
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <Link to={`/asset/${asset.id}`}>
          <img
            src={asset.image}
            alt={asset.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        
        {/* Asset type label */}
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            {asset.type === 'scene' ? 'Scene' : 'Object'}
          </span>
        </div>
      </div>
      
      {/* Asset information */}
      <div className="p-4">
        <Link to={`/asset/${asset.id}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
            {asset.name}
          </h3>
        </Link>
        
        <div className="mt-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Creator: {shortAddress(asset.creator)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created on: {formatDate(asset.createdAt)}
          </p>
        </div>
      </div>
      
      {/* Price and action section */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatETH(price)} ETH
          </span>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleUpdatePrice} className="flex items-center">
            <input
              type="number"
              step="0.001"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 px-2 py-1 border border-gray-300 rounded mr-2 text-sm"
              placeholder="Price in ETH"
            />
            <button
              type="submit"
              className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="px-2 py-1 ml-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(false);
                setPrice(asset.price); // Reset to original price
              }}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            {isOwner && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Edit price
              </button>
            )}
          </>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner size="small" text="Processing..." />
          </div>
        ) : isOwner ? (
          <button
            onClick={handleToggleForSale}
            className={`w-full py-2 text-sm font-medium rounded ${
              isForSale
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isForSale ? 'Remove from Sale' : 'List for Sale'}
          </button>
        ) : isForSale ? (
          <button
            onClick={handlePurchase}
            className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
            disabled={!account}
          >
            Buy Now
          </button>
        ) : (
          <button
            className="w-full py-2 bg-gray-200 text-gray-400 text-sm font-medium rounded cursor-not-allowed"
            disabled
          >
            Not for Sale
          </button>
        )}
      </div>
      
      {/* Error and Success Messages */}
      {error && (
        <div className="mt-2 text-xs text-red-600 text-center">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-2 text-xs text-green-600 text-center">
          {success}
        </div>
      )}
    </div>
  );
};

export default AssetCard; 