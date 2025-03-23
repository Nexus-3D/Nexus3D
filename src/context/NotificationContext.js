import React, { createContext, useState, useContext, useCallback } from 'react';
import NotificationToast from '../components/common/NotificationToast';

// Create context
const NotificationContext = createContext();

/**
 * Notification Provider component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  // Generate unique ID for notifications
  const generateId = useCallback(() => {
    return Date.now() + Math.random().toString(36).substr(2, 5);
  }, []);
  
  // Add notification
  const addNotification = useCallback((type, message, duration = 5000) => {
    const id = generateId();
    setNotifications(prev => [...prev, { id, type, message, duration }]);
    return id;
  }, [generateId]);
  
  // Remove notification by ID
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);
  
  // Helper functions for different notification types
  const showSuccess = useCallback((message, duration) => {
    return addNotification('success', message, duration);
  }, [addNotification]);
  
  const showError = useCallback((message, duration) => {
    return addNotification('error', message, duration);
  }, [addNotification]);
  
  const showWarning = useCallback((message, duration) => {
    return addNotification('warning', message, duration);
  }, [addNotification]);
  
  const showInfo = useCallback((message, duration) => {
    return addNotification('info', message, duration);
  }, [addNotification]);
  
  // Public API
  const value = {
    notify: {
      success: showSuccess,
      error: showError,
      warning: showWarning,
      info: showInfo,
    },
    removeNotification,
  };
  
  return (
    <NotificationContext.Provider value={value}>
      {children}
      {/* Render all active notifications */}
      <div className="notification-container">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            type={notification.type}
            message={notification.message}
            duration={notification.duration}
            onDismiss={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

/**
 * Hook to use notifications
 * @returns {Object} notification methods
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  
  return context;
};

export default NotificationContext; 