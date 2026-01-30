// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.5.0
pragma solidity ^0.8.27;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract Boypho is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner) ERC721("BOY PHO", "BOY") Ownable(initialOwner) {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqtt1h-fclysBNLCiInyWIFU_zNGGAI-35EQ&s";
    }

    function safeMint(address to) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }
}
