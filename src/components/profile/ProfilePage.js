import React, { useState, useEffect } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { shortAddress } from '../../utils/format';
import { getOwnedAssets } from '../../utils/contractService';
import { getSavedScenes, loadSceneFromLocalStorage } from '../../utils/sceneService';
import AssetCard from '../marketplace/AssetCard';
import ConnectWalletButton from '../common/ConnectWalletButton';
import LoadingSpinner from '../common/LoadingSpinner';
import ScenePreview from '../common/ScenePreview';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { account, provider, balance } = useWallet();
  const [ownedAssets, setOwnedAssets] = useState([]);
  const [localScenes, setLocalScenes] = useState([]);
  const [activeTab, setActiveTab] = useState('owned');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account || !provider) return;
    
    const fetchOwnedAssets = async () => {
      try {
        setLoading(true);
        const assets = await getOwnedAssets(account, provider);
        setOwnedAssets(assets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching owned assets:', error);
        setLoading(false);
      }
    };
    
    const fetchLocalScenes = () => {
      const scenes = getSavedScenes();
      setLocalScenes(scenes);
    };
    
    fetchOwnedAssets();
    fetchLocalScenes();
  }, [account, provider]);

  const handleEditScene = (sceneId) => {
    navigate(`/create?sceneId=${sceneId}`);
  };

  const handleDeleteScene = (sceneId) => {
    // Remove from local storage
    localStorage.removeItem(`nexus3d_scene_${sceneId}`);
    
    // Update scenes index
    const scenesIndex = JSON.parse(localStorage.getItem('nexus3d_scenes_index') || '[]');
    const updatedScenesIndex = scenesIndex.filter(scene => scene.id !== sceneId);
    localStorage.setItem('nexus3d_scenes_index', JSON.stringify(updatedScenesIndex));
    
    // Update state
    setLocalScenes(updatedScenesIndex);
  };

  if (!account) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">Connect Your Wallet</h2>
        <p className="mb-8 text-gray-600">Connect your wallet to view your profile and assets</p>
        <div className="flex justify-center">
          <ConnectWalletButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-lg">
              <span className="font-mono">{shortAddress(account)}</span>
              <button 
                className="ml-2 p-1 rounded bg-white bg-opacity-20 hover:bg-opacity-30"
                onClick={() => navigator.clipboard.writeText(account)}
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </p>
          </div>
          <div className="text-center md:text-right">
            <div className="text-sm opacity-80">Balance</div>
            <div className="text-2xl font-bold">
              {balance ? `${parseFloat(balance).toFixed(4)} ETH` : '--'}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'owned'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('owned')}
            >
              Owned NFTs
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'local'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('local')}
            >
              Local Scenes
            </button>
          </nav>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="large" />
        </div>
      ) : (
        <div>
          {activeTab === 'owned' && (
            <>
              {ownedAssets.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl text-gray-500 mb-4">You don't own any NFTs yet</h3>
                  <p className="mb-4">Visit the marketplace to purchase NFTs or create your own</p>
                  <div className="flex space-x-4 justify-center">
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => navigate('/marketplace')}
                    >
                      Browse Marketplace
                    </button>
                    <button 
                      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                      onClick={() => navigate('/create')}
                    >
                      Create New
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {ownedAssets.map(asset => (
                    <AssetCard 
                      key={asset.tokenId}
                      asset={asset}
                      isOwner={true}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'local' && (
            <>
              {localScenes.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl text-gray-500 mb-4">You don't have any saved scenes</h3>
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => navigate('/create')}
                  >
                    Create New Scene
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {localScenes.map(scene => (
                    <div key={scene.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="h-40 bg-gray-200">
                        {scene.thumbnailUrl ? (
                          <img 
                            src={scene.thumbnailUrl} 
                            alt={scene.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No thumbnail
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-1 truncate">{scene.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">
                          Last updated: {new Date(scene.updatedAt).toLocaleString()}
                        </p>
                        <div className="flex space-x-2">
                          <button
                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex-1"
                            onClick={() => handleEditScene(scene.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                            onClick={() => handleDeleteScene(scene.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage; 