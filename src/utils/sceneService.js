import * as THREE from 'three';
import { uploadSceneToIPFS } from './ipfsService';
import { mintAsset } from './contractService';

/**
 * Create a new empty scene
 * @returns {Object} Scene object with Three.js scene and related metadata
 */
export const createNewScene = () => {
  // Create a new Three.js scene
  const scene = new THREE.Scene();
  
  // Add default lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create a default camera
  const camera = new THREE.PerspectiveCamera(
    75, // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near
    1000 // Far
  );
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 0, 0);
  
  return {
    id: Date.now().toString(),
    name: 'Untitled Scene',
    scene,
    camera,
    objects: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: {
      description: '',
      tags: [],
      isPublic: false
    }
  };
};

/**
 * Add a basic 3D object to a scene
 * @param {Object} sceneData - Scene data object
 * @param {string} objectType - Type of object to add (cube, sphere, cylinder, plane)
 * @param {Object} position - Position coordinates {x, y, z}
 * @param {Object} parameters - Additional parameters for the object
 * @returns {Object} Updated scene data with new object
 */
export const addBasicObject = (sceneData, objectType, position = { x: 0, y: 0, z: 0 }, parameters = {}) => {
  let geometry;
  let material;
  let mesh;
  
  // Create geometry based on object type
  switch (objectType) {
    case 'cube':
      geometry = new THREE.BoxGeometry(
        parameters.width || 1,
        parameters.height || 1,
        parameters.depth || 1
      );
      break;
    case 'sphere':
      geometry = new THREE.SphereGeometry(
        parameters.radius || 1,
        parameters.widthSegments || 32,
        parameters.heightSegments || 32
      );
      break;
    case 'cylinder':
      geometry = new THREE.CylinderGeometry(
        parameters.radiusTop || 1,
        parameters.radiusBottom || 1,
        parameters.height || 2,
        parameters.radialSegments || 32
      );
      break;
    case 'plane':
      geometry = new THREE.PlaneGeometry(
        parameters.width || 10,
        parameters.height || 10
      );
      break;
    default:
      geometry = new THREE.BoxGeometry(1, 1, 1);
  }
  
  // Create material
  material = new THREE.MeshStandardMaterial({
    color: parameters.color || 0x3498db,
    metalness: parameters.metalness || 0.2,
    roughness: parameters.roughness || 0.8
  });
  
  // Create mesh
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(position.x, position.y, position.z);
  
  // Add mesh to scene
  sceneData.scene.add(mesh);
  
  // Generate unique ID for the object
  const objectId = Date.now().toString();
  
  // Add object to objects array
  const objectData = {
    id: objectId,
    type: objectType,
    mesh,
    position,
    parameters,
    name: parameters.name || `${objectType}-${objectId.slice(-4)}`
  };
  
  sceneData.objects.push(objectData);
  sceneData.updatedAt = new Date().toISOString();
  
  return {
    ...sceneData,
    activeObjectId: objectId
  };
};

/**
 * Remove an object from the scene
 * @param {Object} sceneData - Scene data object
 * @param {string} objectId - ID of the object to remove
 * @returns {Object} Updated scene data
 */
export const removeObject = (sceneData, objectId) => {
  const objectIndex = sceneData.objects.findIndex(obj => obj.id === objectId);
  
  if (objectIndex !== -1) {
    const object = sceneData.objects[objectIndex];
    
    // Remove from Three.js scene
    sceneData.scene.remove(object.mesh);
    
    // Remove from objects array
    const updatedObjects = [
      ...sceneData.objects.slice(0, objectIndex),
      ...sceneData.objects.slice(objectIndex + 1)
    ];
    
    return {
      ...sceneData,
      objects: updatedObjects,
      activeObjectId: null,
      updatedAt: new Date().toISOString()
    };
  }
  
  return sceneData;
};

/**
 * Update object properties
 * @param {Object} sceneData - Scene data object
 * @param {string} objectId - ID of the object to update
 * @param {Object} newProperties - New properties to apply
 * @returns {Object} Updated scene data
 */
export const updateObjectProperties = (sceneData, objectId, newProperties) => {
  const objectIndex = sceneData.objects.findIndex(obj => obj.id === objectId);
  
  if (objectIndex !== -1) {
    const object = sceneData.objects[objectIndex];
    
    // Update position
    if (newProperties.position) {
      object.mesh.position.set(
        newProperties.position.x,
        newProperties.position.y,
        newProperties.position.z
      );
      object.position = newProperties.position;
    }
    
    // Update rotation
    if (newProperties.rotation) {
      object.mesh.rotation.set(
        newProperties.rotation.x,
        newProperties.rotation.y,
        newProperties.rotation.z
      );
      object.rotation = newProperties.rotation;
    }
    
    // Update scale
    if (newProperties.scale) {
      object.mesh.scale.set(
        newProperties.scale.x,
        newProperties.scale.y,
        newProperties.scale.z
      );
      object.scale = newProperties.scale;
    }
    
    // Update material properties
    if (newProperties.color) {
      object.mesh.material.color.set(newProperties.color);
      object.parameters.color = newProperties.color;
    }
    
    if (newProperties.metalness !== undefined) {
      object.mesh.material.metalness = newProperties.metalness;
      object.parameters.metalness = newProperties.metalness;
    }
    
    if (newProperties.roughness !== undefined) {
      object.mesh.material.roughness = newProperties.roughness;
      object.parameters.roughness = newProperties.roughness;
    }
    
    // Update name
    if (newProperties.name) {
      object.name = newProperties.name;
    }
    
    // Update parameters
    object.parameters = {
      ...object.parameters,
      ...newProperties
    };
    
    // Update object in array
    const updatedObjects = [
      ...sceneData.objects.slice(0, objectIndex),
      object,
      ...sceneData.objects.slice(objectIndex + 1)
    ];
    
    return {
      ...sceneData,
      objects: updatedObjects,
      updatedAt: new Date().toISOString()
    };
  }
  
  return sceneData;
};

/**
 * Serialize scene data for saving or uploading
 * @param {Object} sceneData - Scene data object
 * @returns {Object} Serialized scene data
 */
export const serializeScene = (sceneData) => {
  // Extract serializable data from objects
  const serializedObjects = sceneData.objects.map(obj => ({
    id: obj.id,
    type: obj.type,
    position: {
      x: obj.mesh.position.x,
      y: obj.mesh.position.y,
      z: obj.mesh.position.z
    },
    rotation: {
      x: obj.mesh.rotation.x,
      y: obj.mesh.rotation.y,
      z: obj.mesh.rotation.z
    },
    scale: {
      x: obj.mesh.scale.x,
      y: obj.mesh.scale.y,
      z: obj.mesh.scale.z
    },
    parameters: obj.parameters,
    name: obj.name
  }));
  
  // Camera data
  const cameraData = {
    position: {
      x: sceneData.camera.position.x,
      y: sceneData.camera.position.y,
      z: sceneData.camera.position.z
    },
    rotation: {
      x: sceneData.camera.rotation.x,
      y: sceneData.camera.rotation.y,
      z: sceneData.camera.rotation.z
    },
    fov: sceneData.camera.fov,
    aspect: sceneData.camera.aspect,
    near: sceneData.camera.near,
    far: sceneData.camera.far
  };
  
  return {
    id: sceneData.id,
    name: sceneData.name,
    objects: serializedObjects,
    camera: cameraData,
    createdAt: sceneData.createdAt,
    updatedAt: sceneData.updatedAt,
    metadata: sceneData.metadata
  };
};

/**
 * Deserialize scene data to recreate a Three.js scene
 * @param {Object} serializedData - Serialized scene data
 * @returns {Object} Reconstructed scene data object
 */
export const deserializeScene = (serializedData) => {
  // Create a new scene
  const scene = new THREE.Scene();
  
  // Add default lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create camera
  const camera = new THREE.PerspectiveCamera(
    serializedData.camera.fov,
    serializedData.camera.aspect,
    serializedData.camera.near,
    serializedData.camera.far
  );
  
  camera.position.set(
    serializedData.camera.position.x,
    serializedData.camera.position.y,
    serializedData.camera.position.z
  );
  
  camera.rotation.set(
    serializedData.camera.rotation.x,
    serializedData.camera.rotation.y,
    serializedData.camera.rotation.z
  );
  
  // Create objects
  const objects = serializedData.objects.map(objData => {
    let geometry;
    
    // Create geometry based on object type
    switch (objData.type) {
      case 'cube':
        geometry = new THREE.BoxGeometry(
          objData.parameters.width || 1,
          objData.parameters.height || 1,
          objData.parameters.depth || 1
        );
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(
          objData.parameters.radius || 1,
          objData.parameters.widthSegments || 32,
          objData.parameters.heightSegments || 32
        );
        break;
      case 'cylinder':
        geometry = new THREE.CylinderGeometry(
          objData.parameters.radiusTop || 1,
          objData.parameters.radiusBottom || 1,
          objData.parameters.height || 2,
          objData.parameters.radialSegments || 32
        );
        break;
      case 'plane':
        geometry = new THREE.PlaneGeometry(
          objData.parameters.width || 10,
          objData.parameters.height || 10
        );
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }
    
    // Create material
    const material = new THREE.MeshStandardMaterial({
      color: objData.parameters.color || 0x3498db,
      metalness: objData.parameters.metalness || 0.2,
      roughness: objData.parameters.roughness || 0.8
    });
    
    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    
    // Set position, rotation, and scale
    mesh.position.set(
      objData.position.x,
      objData.position.y,
      objData.position.z
    );
    
    mesh.rotation.set(
      objData.rotation.x,
      objData.rotation.y,
      objData.rotation.z
    );
    
    mesh.scale.set(
      objData.scale.x,
      objData.scale.y,
      objData.scale.z
    );
    
    // Add to scene
    scene.add(mesh);
    
    return {
      id: objData.id,
      type: objData.type,
      mesh,
      position: objData.position,
      rotation: objData.rotation,
      scale: objData.scale,
      parameters: objData.parameters,
      name: objData.name
    };
  });
  
  return {
    id: serializedData.id,
    name: serializedData.name,
    scene,
    camera,
    objects,
    createdAt: serializedData.createdAt,
    updatedAt: serializedData.updatedAt,
    metadata: serializedData.metadata || {
      description: '',
      tags: [],
      isPublic: false
    }
  };
};

/**
 * Save scene to local storage
 * @param {Object} sceneData - Scene data object
 * @returns {boolean} Success status
 */
export const saveSceneToLocalStorage = (sceneData) => {
  try {
    const serializedScene = serializeScene(sceneData);
    localStorage.setItem(`nexus3d_scene_${sceneData.id}`, JSON.stringify(serializedScene));
    
    // Update scenes index
    const scenesIndex = JSON.parse(localStorage.getItem('nexus3d_scenes_index') || '[]');
    const existingIndex = scenesIndex.findIndex(s => s.id === sceneData.id);
    
    if (existingIndex !== -1) {
      scenesIndex[existingIndex] = {
        id: sceneData.id,
        name: sceneData.name,
        updatedAt: sceneData.updatedAt,
        thumbnailUrl: sceneData.thumbnailUrl
      };
    } else {
      scenesIndex.push({
        id: sceneData.id,
        name: sceneData.name,
        updatedAt: sceneData.updatedAt,
        thumbnailUrl: sceneData.thumbnailUrl
      });
    }
    
    localStorage.setItem('nexus3d_scenes_index', JSON.stringify(scenesIndex));
    return true;
  } catch (error) {
    console.error('Error saving scene to local storage:', error);
    return false;
  }
};

/**
 * Load scene from local storage
 * @param {string} sceneId - ID of the scene to load
 * @returns {Object|null} Loaded scene data or null if not found
 */
export const loadSceneFromLocalStorage = (sceneId) => {
  try {
    const serializedScene = localStorage.getItem(`nexus3d_scene_${sceneId}`);
    
    if (!serializedScene) {
      return null;
    }
    
    return deserializeScene(JSON.parse(serializedScene));
  } catch (error) {
    console.error('Error loading scene from local storage:', error);
    return null;
  }
};

/**
 * Get list of saved scenes from local storage
 * @returns {Array} List of saved scenes
 */
export const getSavedScenes = () => {
  try {
    const scenesIndex = JSON.parse(localStorage.getItem('nexus3d_scenes_index') || '[]');
    return scenesIndex;
  } catch (error) {
    console.error('Error getting saved scenes:', error);
    return [];
  }
};

/**
 * Generate a thumbnail for a scene
 * @param {Object} sceneData - Scene data object
 * @param {number} width - Thumbnail width
 * @param {number} height - Thumbnail height
 * @returns {string} Thumbnail data URL
 */
export const generateSceneThumbnail = (sceneData, width = 300, height = 200) => {
  // Create a renderer to render the thumbnail
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xf0f0f0);
  
  // Render the scene
  renderer.render(sceneData.scene, sceneData.camera);
  
  // Get the data URL
  const dataURL = renderer.domElement.toDataURL('image/png');
  
  // Dispose of the renderer to free memory
  renderer.dispose();
  
  return dataURL;
};

/**
 * Publish a scene to IPFS and mint as NFT
 * @param {Object} sceneData - Scene data object
 * @param {ethers.Signer} signer - Ethers signer
 * @param {number} price - Price in ETH
 * @param {boolean} isForSale - Whether the asset is for sale
 * @returns {Promise<Object>} - Published asset data
 */
export const publishScene = async (sceneData, signer, price, isForSale = true) => {
  try {
    // Serialize the scene
    const serializedScene = serializeScene(sceneData);
    
    // Generate a thumbnail
    const thumbnailDataURL = generateSceneThumbnail(sceneData);
    
    // Upload to IPFS
    const ipfsResult = await uploadSceneToIPFS(
      serializedScene,
      thumbnailDataURL
    );
    
    // Mint as NFT
    const mintResult = await mintAsset(
      {
        type: 'scene',
        tokenURI: ipfsResult.metadataURI,
        price: price,
        isForSale,
        name: sceneData.name,
        description: sceneData.metadata.description || `3D Scene: ${sceneData.name}`
      },
      signer
    );
    
    return {
      ...mintResult,
      ipfsURI: ipfsResult.contentURI,
      metadataURI: ipfsResult.metadataURI,
      thumbnailURI: ipfsResult.thumbnailURI
    };
  } catch (error) {
    console.error('Error publishing scene:', error);
    throw error;
  }
}; 