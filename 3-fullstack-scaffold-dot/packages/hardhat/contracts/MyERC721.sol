// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC721 is ERC721, Ownable {
    uint256 public tokenIdCounter;

    constructor(address owner) ERC721("My NFT", "MNFT") Ownable(owner) {}

    function mint(address to) public onlyOwner returns (uint256) {
        uint256 tokenId = tokenIdCounter;
        tokenIdCounter += 1;
        _safeMint(to, tokenId);
        return tokenId;
    }
}
