import React, { useState, useEffect } from 'react';

// Styles for different notification types
const typeStyles = {
  success: {
    icon: (
      <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgClass: 'bg-green-50 dark:bg-green-900',
    borderClass: 'border-green-400 dark:border-green-700',
    textClass: 'text-green-800 dark:text-green-100'
  },
  error: {
    icon: (
      <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgClass: 'bg-red-50 dark:bg-red-900',
    borderClass: 'border-red-400 dark:border-red-700',
    textClass: 'text-red-800 dark:text-red-100'
  },
  warning: {
    icon: (
      <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    bgClass: 'bg-yellow-50 dark:bg-yellow-900',
    borderClass: 'border-yellow-400 dark:border-yellow-700',
    textClass: 'text-yellow-800 dark:text-yellow-100'
  },
  info: {
    icon: (
      <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgClass: 'bg-blue-50 dark:bg-blue-900',
    borderClass: 'border-blue-400 dark:border-blue-700',
    textClass: 'text-blue-800 dark:text-blue-100'
  }
};

const Notification = ({ 
  type = 'info', 
  title, 
  message, 
  isOpen, 
  onClose, 
  autoClose = true,
  duration = 5000 
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  
  useEffect(() => {
    setIsVisible(isOpen);
    
    // Auto close
    let timer;
    if (isOpen && autoClose) {
      timer = setTimeout(() => {
        setIsVisible(false);
        onClose && onClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, autoClose, duration, onClose]);
  
  if (!isVisible) return null;
  
  const style = typeStyles[type] || typeStyles.info;
  
  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-down max-w-sm">
      <div className={`rounded-md border ${style.borderClass} ${style.bgClass} p-4 shadow-lg`}>
        <div className="flex">
          <div className="flex-shrink-0">
            {style.icon}
          </div>
          <div className="ml-3">
            {title && (
              <h3 className={`text-sm font-medium ${style.textClass}`}>
                {title}
              </h3>
            )}
            {message && (
              <div className={`mt-2 text-sm ${style.textClass}`}>
                <p>{message}</p>
              </div>
            )}
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={() => {
                  setIsVisible(false);
                  onClose && onClose();
                }}
                className={`inline-flex rounded-md p-1.5 ${style.textClass} hover:bg-white hover:bg-opacity-10 focus:outline-none`}
              >
                <span className="sr-only">Close</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Notification management system
export const NotificationContainer = ({ notifications, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => onClose(notification.id)}
        />
      ))}
    </div>
  );
};

export default Notification; 