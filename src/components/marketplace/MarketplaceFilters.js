import React, { useState } from 'react';

/**
 * Filters component for the marketplace
 * 
 * @param {Object} props - Component props
 * @param {Object} props.filters - Current filter state
 * @param {Function} props.onFilterChange - Function to handle filter changes
 * @param {number} props.assetCount - Number of assets currently displayed
 */
const MarketplaceFilters = ({ filters, onFilterChange, assetCount = 0 }) => {
  const [searchInput, setSearchInput] = useState(filters.searchTerm || '');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  
  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ searchTerm: searchInput });
  };
  
  // Handle asset type change
  const handleTypeChange = (type) => {
    onFilterChange({ type });
  };
  
  // Handle price range change
  const handlePriceRangeChange = (e) => {
    const [min, max] = e.target.value.split('-').map(Number);
    onFilterChange({ priceRange: [min, max] });
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    onFilterChange({ sortBy: e.target.value });
  };
  
  // Toggle mobile filters visibility
  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchInput('');
    onFilterChange({
      type: 'all',
      priceRange: [0, 10],
      sortBy: 'newest',
      searchTerm: '',
    });
  };
  
  return (
    <div className="mb-8">
      {/* Search and Mobile Filter Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <form onSubmit={handleSearchSubmit} className="flex w-full md:w-80">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchInput}
              onChange={handleSearchChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </button>
          </form>
        </div>
        
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="text-sm text-gray-600 mr-4">
            {assetCount} {assetCount === 1 ? 'asset' : 'assets'} found
          </div>
          
          <button
            onClick={toggleFilters}
            className="md:hidden flex items-center px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
              />
            </svg>
            Filters
          </button>
          
          <button
            onClick={clearFilters}
            className="ml-2 px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:underline"
          >
            Clear
          </button>
        </div>
      </div>
      
      {/* Filter Options */}
      <div className={`bg-white p-4 rounded-lg shadow ${isFilterVisible || 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asset Type
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => handleTypeChange('all')}
                className={`px-3 py-1 text-sm rounded-full ${
                  filters.type === 'all'
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleTypeChange('object')}
                className={`px-3 py-1 text-sm rounded-full ${
                  filters.type === 'object'
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Objects
              </button>
              <button
                onClick={() => handleTypeChange('scene')}
                className={`px-3 py-1 text-sm rounded-full ${
                  filters.type === 'scene'
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Scenes
              </button>
            </div>
          </div>
          
          {/* Price Range Filter */}
          <div>
            <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-2">
              Price Range (ETH)
            </label>
            <select
              id="price-range"
              value={`${filters.priceRange[0]}-${filters.priceRange[1]}`}
              onChange={handlePriceRangeChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="0-0.1">0 - 0.1 ETH</option>
              <option value="0-1">0 - 1 ETH</option>
              <option value="0-10">0 - 10 ETH</option>
              <option value="1-10">1 - 10 ETH</option>
              <option value="10-100">10 - 100 ETH</option>
            </select>
          </div>
          
          {/* Sort Filter */}
          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              id="sort-by"
              value={filters.sortBy}
              onChange={handleSortChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
          
          {/* Active Filters Summary */}
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Active Filters
            </div>
            <div className="text-sm text-gray-600">
              {filters.type !== 'all' && (
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mr-1 mb-1">
                  Type: {filters.type.charAt(0).toUpperCase() + filters.type.slice(1)}
                </span>
              )}
              {filters.searchTerm && (
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mr-1 mb-1">
                  Search: {filters.searchTerm}
                </span>
              )}
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mr-1 mb-1">
                Price: {filters.priceRange[0]} - {filters.priceRange[1]} ETH
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceFilters; 