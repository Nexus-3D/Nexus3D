import React, { useState, useEffect } from 'react';

/**
 * Notification Toast component for displaying messages
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Notification type: 'success', 'error', 'warning', 'info'
 * @param {string} props.message - Message to display
 * @param {number} props.duration - Duration in ms before auto-dismiss (default: 5000, 0 to disable)
 * @param {Function} props.onDismiss - Function to call when notification is dismissed
 */
const NotificationToast = ({ type = 'info', message, duration = 5000, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Reset visibility when message changes
    setIsVisible(true);
    
    // Set up auto-dismiss timer if duration > 0
    let timer;
    if (duration > 0) {
      timer = setTimeout(() => {
        handleDismiss();
      }, duration);
    }
    
    // Clean up timer on unmount or when message changes
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [message, duration]);
  
  // Handle manual dismiss
  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      setTimeout(() => {
        onDismiss();
      }, 300); // Wait for exit animation to complete
    }
  };
  
  // Define styling based on notification type
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-400',
          textColor: 'text-green-800',
          iconColor: 'text-green-400',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-400',
          textColor: 'text-red-800',
          iconColor: 'text-red-400',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-400',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-400',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-400',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-400',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )
        };
    }
  };
  
  const styles = getTypeStyles();
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      <div className={`${styles.bgColor} border-l-4 ${styles.borderColor} p-4 rounded shadow-lg`}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${styles.iconColor}`}>
            {styles.icon}
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-medium ${styles.textColor}`}>{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className={`inline-flex ${styles.textColor} focus:outline-none focus:text-gray-500`}
              onClick={handleDismiss}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast; 