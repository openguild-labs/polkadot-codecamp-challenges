// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.5.0
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MatMeo is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("Mat Meo", "MEO")
        Ownable(initialOwner)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://lh7-rt.googleusercontent.com/docsz/AD_4nXeMTDR9iCCplqz0aDbb98D64oVis8pOcDIgSR8Pc9lXofRErVjxbp_nFmWjIhr2nx0lRrgU7l71H9tNW-T8_95XYbCPzwdAudc62RELWICTsOCWgfqtMwCTjClNMMdonCMC8xxP5b7A5_CQ1ZDsCKEDkXtq?key=tE_qip6BHPL4g00JXL_X6Q";
    }

    function safeMint(address to) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }
}