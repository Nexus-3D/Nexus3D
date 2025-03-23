import { ethers } from 'ethers';
import Nexus3DNFT from '../contracts/artifacts/Nexus3DNFT.json';

// Contract addresses for different networks
const CONTRACT_ADDRESSES = {
  // Mumbai testnet (Polygon testnet)
  80001: '0x123abc...', // This needs to be replaced with the deployed contract address
  // Polygon mainnet
  137: '0x456def...', // This needs to be replaced with the deployed contract address
};

/**
 * Get a contract instance
 * @param {ethers.Signer|ethers.providers.Provider} signerOrProvider - Ethers signer or provider
 * @param {number} chainId - Chain ID
 * @returns {ethers.Contract} - Contract instance
 */
export const getContract = (signerOrProvider, chainId = 80001) => {
  const contractAddress = CONTRACT_ADDRESSES[chainId];
  
  if (!contractAddress) {
    throw new Error(`No contract deployed on chain ${chainId}`);
  }
  
  return new ethers.Contract(contractAddress, Nexus3DNFT.abi, signerOrProvider);
};

/**
 * Mint a new 3D asset as NFT
 * @param {Object} assetData - Asset data
 * @param {ethers.Signer} signer - Ethers signer
 * @param {number} chainId - Chain ID
 * @returns {Promise<Object>} - Transaction and token info
 */
export const mintAsset = async (assetData, signer, chainId = 80001) => {
  try {
    // Get the contract instance
    const contract = getContract(signer, chainId);
    
    // Determine asset type (0 for Object, 1 for Scene)
    const assetType = assetData.type === 'scene' ? 1 : 0;
    
    // Convert price to wei
    const priceInWei = ethers.parseEther(assetData.price.toString());
    
    // Mint the asset
    const tx = await contract.mintAsset(
      await signer.getAddress(),
      assetData.tokenURI,
      assetType,
      priceInWei,
      assetData.isForSale || false
    );
    
    // Wait for confirmation
    const receipt = await tx.wait();
    
    // Get the token ID from the event
    const event = receipt.events.find(event => event.event === 'AssetCreated');
    const tokenId = event.args.tokenId.toString();
    
    return {
      tokenId,
      transactionHash: receipt.hash,
      success: true
    };
  } catch (error) {
    console.error('Error minting asset:', error);
    throw error;
  }
};

/**
 * Get all assets owned by an address
 * @param {string} address - Owner address
 * @param {ethers.providers.Provider} provider - Ethers provider
 * @param {number} chainId - Chain ID
 * @returns {Promise<Array>} - Array of owned assets
 */
export const getOwnedAssets = async (address, provider, chainId = 80001) => {
  try {
    const contract = getContract(provider, chainId);
    
    // Get the balance of the owner
    const balance = await contract.balanceOf(address);
    
    // Get all token IDs owned by the address
    const ownedAssets = [];
    for (let i = 0; i < balance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(address, i);
      const tokenURI = await contract.tokenURI(tokenId);
      const metadata = await contract.getAssetMetadata(tokenId);
      
      ownedAssets.push({
        tokenId: tokenId.toString(),
        tokenURI,
        assetType: metadata.assetType === 0 ? 'object' : 'scene',
        creator: metadata.creator,
        price: ethers.formatEther(metadata.price),
        isForSale: metadata.isForSale,
        createdAt: new Date(metadata.createdAt * 1000).toISOString()
      });
    }
    
    return ownedAssets;
  } catch (error) {
    console.error('Error getting owned assets:', error);
    throw error;
  }
};

/**
 * Purchase an asset
 * @param {string} tokenId - Token ID
 * @param {ethers.Signer} signer - Ethers signer
 * @param {string} price - Price in ETH
 * @param {number} chainId - Chain ID
 * @returns {Promise<Object>} - Transaction info
 */
export const purchaseAsset = async (tokenId, signer, price, chainId = 80001) => {
  try {
    const contract = getContract(signer, chainId);
    
    // Convert price to wei
    const priceInWei = ethers.parseEther(price);
    
    // Purchase the asset
    const tx = await contract.purchaseAsset(tokenId, { value: priceInWei });
    
    // Wait for confirmation
    const receipt = await tx.wait();
    
    return {
      transactionHash: receipt.hash,
      success: true
    };
  } catch (error) {
    console.error('Error purchasing asset:', error);
    throw error;
  }
};

/**
 * Set asset for sale status
 * @param {string} tokenId - Token ID
 * @param {boolean} isForSale - Whether the asset is for sale
 * @param {ethers.Signer} signer - Ethers signer
 * @param {number} chainId - Chain ID
 * @returns {Promise<Object>} - Transaction info
 */
export const setAssetForSale = async (tokenId, isForSale, signer, chainId = 80001) => {
  try {
    const contract = getContract(signer, chainId);
    
    // Set asset for sale status
    const tx = await contract.setAssetForSale(tokenId, isForSale);
    
    // Wait for confirmation
    const receipt = await tx.wait();
    
    return {
      transactionHash: receipt.hash,
      success: true
    };
  } catch (error) {
    console.error('Error setting asset for sale:', error);
    throw error;
  }
};

/**
 * Set asset price
 * @param {string} tokenId - Token ID
 * @param {string} price - Price in ETH
 * @param {ethers.Signer} signer - Ethers signer
 * @param {number} chainId - Chain ID
 * @returns {Promise<Object>} - Transaction info
 */
export const setAssetPrice = async (tokenId, price, signer, chainId = 80001) => {
  try {
    const contract = getContract(signer, chainId);
    
    // Convert price to wei
    const priceInWei = ethers.parseEther(price);
    
    // Set asset price
    const tx = await contract.setAssetPrice(tokenId, priceInWei);
    
    // Wait for confirmation
    const receipt = await tx.wait();
    
    return {
      transactionHash: receipt.hash,
      success: true
    };
  } catch (error) {
    console.error('Error setting asset price:', error);
    throw error;
  }
}; 