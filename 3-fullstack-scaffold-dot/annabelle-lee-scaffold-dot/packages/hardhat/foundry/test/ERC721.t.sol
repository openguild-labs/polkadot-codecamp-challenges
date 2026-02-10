//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "forge-std/Test.sol";
import {ERC721Token} from "@contracts/ERC721.sol";

contract ERC721Test is Test {
    ERC721Token nft;
    address owner;
    address user1;
    address user2;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        
        nft = new ERC721Token("TestNFT", "TNFT");
    }

    function testInitialState() public {
        assertEq(nft.name(), "TestNFT");
        assertEq(nft.symbol(), "TNFT");
        assertEq(nft.getCurrentTokenId(), 0);
    }

    function testMintWithoutURI() public {
        uint256 tokenId = nft.mint(user1);
        
        assertEq(nft.ownerOf(tokenId), user1);
        assertEq(nft.balanceOf(user1), 1);
        assertEq(nft.getCurrentTokenId(), 1);
    }

    function testMintWithURI() public {
        string memory uri = "https://example.com/token/1";
        uint256 tokenId = nft.mint(user1, uri);
        
        assertEq(nft.ownerOf(tokenId), user1);
        assertEq(nft.tokenURI(tokenId), uri);
        assertEq(nft.getCurrentTokenId(), 1);
    }

    function testMultipleMints() public {
        nft.mint(user1);
        nft.mint(user2);
        nft.mint(user1);
        
        assertEq(nft.balanceOf(user1), 2);
        assertEq(nft.balanceOf(user2), 1);
        assertEq(nft.getCurrentTokenId(), 3);
    }

    function testTransferFrom() public {
        uint256 tokenId = nft.mint(user1);
        
        vm.prank(user1);
        nft.transferFrom(user1, user2, tokenId);
        
        assertEq(nft.ownerOf(tokenId), user2);
        assertEq(nft.balanceOf(user1), 0);
        assertEq(nft.balanceOf(user2), 1);
    }

    function testSafeTransferFrom() public {
        uint256 tokenId = nft.mint(user1);
        
        vm.prank(user1);
        nft.safeTransferFrom(user1, user2, tokenId);
        
        assertEq(nft.ownerOf(tokenId), user2);
    }
}
