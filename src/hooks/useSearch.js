import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Custom hook for advanced search functionality
 * 
 * @param {Array} items - Array of items to search through
 * @param {Object} options - Search configuration options
 * @param {string} options.searchTerm - Term to search for
 * @param {Array} options.searchFields - Array of fields to search in
 * @param {Object} options.filters - Object containing filter criteria
 * @param {Function} options.sortBy - Function to sort results
 * @returns {Object} search results and utilities
 */
const useSearch = (
  items = [],
  {
    searchTerm = '',
    searchFields = [],
    filters = {},
    sortBy = null,
  } = {}
) => {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  // Memoize the normalized search term to avoid recalculating
  const normalizedSearchTerm = useMemo(() => {
    return searchTerm.trim().toLowerCase();
  }, [searchTerm]);

  // Check if an item matches the search term in any of the specified fields
  const matchesSearchTerm = useCallback((item) => {
    if (!normalizedSearchTerm) return true;
    
    return searchFields.some(field => {
      const fieldValue = typeof field === 'function' 
        ? field(item) 
        : item[field];
      
      if (fieldValue === undefined || fieldValue === null) return false;
      
      const stringValue = String(fieldValue).toLowerCase();
      return stringValue.includes(normalizedSearchTerm);
    });
  }, [normalizedSearchTerm, searchFields]);

  // Check if an item matches all active filters
  const matchesFilters = useCallback((item) => {
    if (!filters || Object.keys(filters).length === 0) return true;
    
    return Object.entries(filters).every(([key, value]) => {
      // Skip empty filter values
      if (value === undefined || value === null || value === '' || value === 'all') {
        return true;
      }
      
      // Handle range filters
      if (Array.isArray(value) && value.length === 2) {
        const [min, max] = value;
        const itemValue = item[key];
        return itemValue >= min && itemValue <= max;
      }
      
      // Handle array values (multiple selection)
      if (Array.isArray(value)) {
        return value.includes(item[key]);
      }
      
      // Handle custom filter functions
      if (typeof value === 'function') {
        return value(item);
      }
      
      // Handle exact match by default
      return item[key] === value;
    });
  }, [filters]);

  // Perform the search
  const performSearch = useCallback(() => {
    if (!items || items.length === 0) {
      setResults([]);
      return;
    }
    
    try {
      setIsSearching(true);
      setError(null);
      
      // Apply search and filters
      let searchResults = items.filter(item => 
        matchesSearchTerm(item) && matchesFilters(item)
      );
      
      // Apply sorting if provided
      if (sortBy) {
        searchResults = [...searchResults].sort(sortBy);
      }
      
      setResults(searchResults);
    } catch (err) {
      setError(err.message || 'An error occurred during search');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [items, matchesSearchTerm, matchesFilters, sortBy]);

  // Run search whenever dependencies change
  useEffect(() => {
    performSearch();
  }, [performSearch]);

  // Manually trigger search
  const refresh = useCallback(() => {
    performSearch();
  }, [performSearch]);

  return {
    results,
    isSearching,
    error,
    refresh,
    resultsCount: results.length,
    hasResults: results.length > 0
  };
};

export default useSearch; 