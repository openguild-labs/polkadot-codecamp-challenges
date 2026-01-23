//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * ERC721 – Scaffold-ETH Challenge 3
 */
contract MyERC721 is ERC721URIStorage {
    address public immutable owner;
    uint256 public totalCounter;

    event Mint(
        address indexed minter,
        uint256 indexed tokenId,
        string tokenURI,
        uint256 value
    );

    constructor(address _owner) ERC721("Scaffold NFT", "SNFT") {
        owner = _owner;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    function mint(string memory tokenURI) public payable {
        uint256 tokenId = totalCounter;
        totalCounter++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit Mint(msg.sender, tokenId, tokenURI, msg.value);
    }

    function withdraw() public isOwner {
        (bool success, ) = owner.call{ value: address(this).balance }("");
        require(success, "Withdraw failed");
    }

    receive() external payable {}
}
