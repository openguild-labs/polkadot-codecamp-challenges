//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A simple ERC721 NFT contract with minting and URI management
 * @author Scaffold DOT
 */
contract ScaffoldERC721 is ERC721, ERC721URIStorage, Ownable {
    // State variables
    uint256 private _nextTokenId;

    // Events
    event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
    event NFTBurned(uint256 indexed tokenId);

    /**
     * Constructor: Initialize the NFT collection with name and symbol
     * @param _owner The address that will be set as the owner of the contract
     */
    constructor(address _owner) ERC721("Scaffold NFT", "SCNFT") Ownable(_owner) {
        _nextTokenId = 1; // Start token IDs at 1
    }

    /**
     * Function to mint a new NFT
     * Anyone can mint, but with optional URI
     * @param to Address to receive the minted NFT
     * @param uri Metadata URI for the NFT
     * @return tokenId The ID of the newly minted token
     */
    function mint(address to, string memory uri) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit NFTMinted(to, tokenId, uri);
        return tokenId;
    }

    /**
     * Function to mint a new NFT (owner only)
     * @param to Address to receive the minted NFT
     * @param uri Metadata URI for the NFT
     * @return tokenId The ID of the newly minted token
     */
    function ownerMint(address to, string memory uri) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit NFTMinted(to, tokenId, uri);
        return tokenId;
    }

    /**
     * Function to burn an NFT
     * Only the owner of the NFT can burn it
     * @param tokenId The ID of the token to burn
     */
    function burn(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");
        _burn(tokenId);
        emit NFTBurned(tokenId);
    }

    /**
     * Function to get the total number of minted NFTs
     * @return The total supply of NFTs
     */
    function totalSupply() public view returns (uint256) {
        return _nextTokenId - 1;
    }

    /**
     * Function to update the token URI
     * Only the owner of the NFT can update the URI
     * @param tokenId The ID of the token
     * @param uri New metadata URI for the NFT
     */
    function updateTokenURI(uint256 tokenId, string memory uri) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");
        _setTokenURI(tokenId, uri);
    }

    // Override required functions
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
