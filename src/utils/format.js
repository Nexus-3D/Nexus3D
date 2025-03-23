/**
 * Format a wallet address to a shortened version
 * @param {string} address - Full wallet address
 * @param {number} startLength - Length of starting characters to keep
 * @param {number} endLength - Length of ending characters to keep
 * @returns {string} Shortened address
 */
export const shortAddress = (address, startLength = 6, endLength = 4) => {
  if (!address) return '';
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

/**
 * Format ETH value to specified decimal places
 * @param {string|number} value - ETH value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted ETH value
 */
export const formatETH = (value, decimals = 4) => {
  if (!value) return '0';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return num.toFixed(decimals);
};

/**
 * Format a date string to a readable format
 * @param {string} dateString - ISO date string
 * @param {Object} options - Date formatting options
 * @returns {string} Formatted date
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  
  return date.toLocaleDateString(undefined, { ...defaultOptions, ...options });
};

/**
 * Format file size in bytes to human-readable format
 * @param {number} bytes - Size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

/**
 * Format currency value with symbol
 * @param {number} value - Currency value
 * @param {string} currency - Currency code
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted currency
 */
export const formatCurrency = (value, currency = 'USD', decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}; 