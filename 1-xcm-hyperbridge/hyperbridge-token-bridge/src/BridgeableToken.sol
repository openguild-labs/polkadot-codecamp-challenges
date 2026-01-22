// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {HyperFungibleToken} from "@hyperbridge/core/apps/HyperFungibleToken.sol";


contract BridgeableToken is HyperFungibleToken {
    address private immutable _gateway;

    constructor(
        string memory name,
        string memory symbol,
        address gatewayAddress
    ) HyperFungibleToken(name, symbol) {
        _gateway = gatewayAddress;
    }

    function gateway() public view override returns (address) {
        return _gateway;
    }
}