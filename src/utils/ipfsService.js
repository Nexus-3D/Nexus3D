import { create } from 'ipfs-http-client';

/**
 * Configuration for IPFS client
 * For MVP, we'll use the public Infura IPFS gateway
 * In production, this would be configured with the project's dedicated endpoints
 */
const projectId = process.env.REACT_APP_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.REACT_APP_INFURA_IPFS_PROJECT_SECRET;
const ipfsGateway = 'https://ipfs.io/ipfs/';

/**
 * Create authenticated IPFS client
 */
const createIPFSClient = () => {
  // If no credentials provided, use a local node or a public gateway
  if (!projectId || !projectSecret) {
    console.warn('IPFS credentials not found in environment, using local node');
    return create({ url: 'http://localhost:5001' });
  }

  // Auth required for Infura IPFS
  const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  return create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });
};

/**
 * IPFS Client instance for file operations
 */
let ipfsClient;
try {
  ipfsClient = createIPFSClient();
} catch (error) {
  console.error('IPFS client initialization error:', error);
}

/**
 * Upload content to IPFS
 * @param {File|Buffer|String} content - The content to upload
 * @returns {Promise<string>} - The IPFS CID
 */
export const uploadToIPFS = async (content) => {
  if (!ipfsClient) {
    throw new Error('IPFS client not initialized');
  }
  
  try {
    const result = await ipfsClient.add(content);
    console.log('IPFS upload result:', result);
    return result.path;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

/**
 * Upload metadata object to IPFS
 * @param {Object} metadata - The metadata object
 * @returns {Promise<string>} - The IPFS CID
 */
export const uploadMetadataToIPFS = async (metadata) => {
  if (!ipfsClient) {
    throw new Error('IPFS client not initialized');
  }
  
  try {
    const metadataString = JSON.stringify(metadata);
    const result = await ipfsClient.add(metadataString);
    return result.path;
  } catch (error) {
    console.error('Error uploading metadata to IPFS:', error);
    throw error;
  }
};

/**
 * Convert IPFS CID to HTTP URL
 * @param {string} cid - The IPFS CID
 * @returns {string} - The HTTP URL
 */
export const getIPFSGatewayURL = (cid) => {
  if (!cid) return '';
  
  // Ensure CID doesn't start with ipfs://
  const cleanCID = cid.replace(/^ipfs:\/\//, '');
  return `${ipfsGateway}${cleanCID}`;
};

/**
 * Upload scene data to IPFS
 * @param {Object} sceneData - The scene data
 * @param {File|null} thumbnail - The scene thumbnail
 * @returns {Promise<Object>} - The metadata with IPFS URLs
 */
export const uploadSceneToIPFS = async (sceneData, thumbnail = null) => {
  // First upload the thumbnail if provided
  let thumbnailCID = '';
  if (thumbnail) {
    thumbnailCID = await uploadToIPFS(thumbnail);
  }
  
  // Prepare metadata
  const metadata = {
    name: sceneData.name,
    description: sceneData.description || '',
    external_url: `https://nexus3d.io/scene/${sceneData.id}`,
    image: thumbnailCID ? getIPFSGatewayURL(thumbnailCID) : '',
    attributes: [
      {
        trait_type: 'Type',
        value: 'Scene',
      },
      {
        trait_type: 'Creator',
        value: sceneData.createdBy,
      },
      {
        display_type: 'date', 
        trait_type: 'Created Date', 
        value: Math.floor(new Date(sceneData.createdAt).getTime() / 1000)
      }
    ],
    scene_data: sceneData.objects,
  };
  
  // Upload metadata
  const metadataCID = await uploadMetadataToIPFS(metadata);
  
  return {
    metadataCID,
    thumbnailCID,
    metadataURL: getIPFSGatewayURL(metadataCID),
    thumbnailURL: thumbnailCID ? getIPFSGatewayURL(thumbnailCID) : '',
    metadata,
  };
}; 