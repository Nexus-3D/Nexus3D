import React from 'react';
import { Link } from 'react-router-dom';

const CreationModal = ({ isOpen, onClose, assetData }) => {
  if (!isOpen) return null;

  const { name, thumbnail, id, type } = assetData || {
    name: 'Untitled Scene',
    thumbnail: 'https://via.placeholder.com/400x300?text=Nexus3D',
    id: 'temp-id',
    type: 'scene'
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity" 
          onClick={onClose}
          aria-hidden="true"
        ></div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        {/* Modal content */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Creation Complete
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your {type === 'scene' ? 'scene' : 'asset'} has been successfully created and saved on the blockchain. You can now view or continue editing it.
                </p>
              </div>
              
              <div className="mt-4 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                <img 
                  src={thumbnail} 
                  alt={name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 bg-gray-50 dark:bg-gray-900">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {name}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
            <Link
              to={`/asset/${id}`}
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:text-sm"
            >
              View Details
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 sm:mt-0 inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none sm:text-sm"
            >
              Continue Editing
            </button>
          </div>
          
          <div className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>Transaction Hash: <span className="font-mono">0x72f5...3e1c</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationModal; 