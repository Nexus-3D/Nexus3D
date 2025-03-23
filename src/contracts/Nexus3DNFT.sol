// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Nexus3DNFT
 * @dev Contract for Nexus3D platform NFTs representing 3D assets and scenes
 */
contract Nexus3DNFT is ERC721URIStorage, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Asset types
    enum AssetType { Object, Scene }
    
    // Asset metadata
    struct AssetMetadata {
        AssetType assetType;
        string creator;
        uint256 price;
        bool isForSale;
        uint256 createdAt;
    }
    
    // Mapping from token ID to asset metadata
    mapping(uint256 => AssetMetadata) private _assetMetadata;
    
    // Events
    event AssetCreated(uint256 indexed tokenId, address indexed creator, AssetType assetType, string tokenURI);
    event AssetPriceChanged(uint256 indexed tokenId, uint256 newPrice);
    event AssetForSaleChanged(uint256 indexed tokenId, bool isForSale);
    
    constructor() ERC721("Nexus3D NFT", "N3D") Ownable(msg.sender) {}
    
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
    /**
     * @dev Override of _update function for both extensions
     */
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }
    
    /**
     * @dev Override of _increaseBalance function for both extensions
     */
    function _increaseBalance(address account, uint128 amount)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, amount);
    }
    
    /**
     * @dev Override of tokenURI function for both extensions
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    /**
     * @dev Mint a new NFT representing a 3D asset
     * @param to The owner of the new token
     * @param tokenURI The token URI (IPFS CID)
     * @param assetType The type of asset (Object or Scene)
     * @param price The initial price of the asset
     * @param isForSale Whether the asset is for sale
     * @return The ID of the new token
     */
    function mintAsset(
        address to,
        string memory tokenURI,
        AssetType assetType,
        uint256 price,
        bool isForSale
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        _assetMetadata[newTokenId] = AssetMetadata({
            assetType: assetType,
            creator: toString(to),
            price: price,
            isForSale: isForSale,
            createdAt: block.timestamp
        });
        
        emit AssetCreated(newTokenId, to, assetType, tokenURI);
        
        return newTokenId;
    }
    
    /**
     * @dev Set the price of an asset
     * @param tokenId The ID of the token
     * @param newPrice The new price of the asset
     */
    function setAssetPrice(uint256 tokenId, uint256 newPrice) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved or owner");
        
        _assetMetadata[tokenId].price = newPrice;
        
        emit AssetPriceChanged(tokenId, newPrice);
    }
    
    /**
     * @dev Set whether an asset is for sale
     * @param tokenId The ID of the token
     * @param isForSale Whether the asset is for sale
     */
    function setAssetForSale(uint256 tokenId, bool isForSale) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved or owner");
        
        _assetMetadata[tokenId].isForSale = isForSale;
        
        emit AssetForSaleChanged(tokenId, isForSale);
    }
    
    /**
     * @dev Get the metadata of an asset
     * @param tokenId The ID of the token
     * @return The metadata of the asset
     */
    function getAssetMetadata(uint256 tokenId) public view returns (AssetMetadata memory) {
        require(_exists(tokenId), "Token does not exist");
        
        return _assetMetadata[tokenId];
    }
    
    /**
     * @dev Purchase an asset
     * @param tokenId The ID of the token
     */
    function purchaseAsset(uint256 tokenId) public payable {
        address owner = ownerOf(tokenId);
        require(owner != msg.sender, "Cannot purchase your own asset");
        require(_assetMetadata[tokenId].isForSale, "Asset not for sale");
        require(msg.value >= _assetMetadata[tokenId].price, "Insufficient funds");
        
        address payable seller = payable(owner);
        seller.transfer(msg.value);
        
        _transfer(owner, msg.sender, tokenId);
        _assetMetadata[tokenId].isForSale = false;
    }
    
    /**
     * @dev Check if a token exists
     * @param tokenId The ID of the token
     * @return Whether the token exists
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
    
    /**
     * @dev Convert an address to a string
     * @param account The address to convert
     * @return The string representation of the address
     */
    function toString(address account) internal pure returns (string memory) {
        return toString(abi.encodePacked(account));
    }
    
    /**
     * @dev Convert bytes to a string
     * @param data The bytes to convert
     * @return The string representation of the bytes
     */
    function toString(bytes memory data) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint i = 0; i < data.length; i++) {
            str[2 + i * 2] = alphabet[uint(uint8(data[i] >> 4))];
            str[3 + i * 2] = alphabet[uint(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }
} 