// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import {BridgeableToken} from "../src/BridgeableToken.sol";

contract BridgeableTokenTest is Test {
    BridgeableToken token;
    address gateway = address(0x1234);

    function setUp() public {
        token = new BridgeableToken("Bridgeable Token", "BRG", gateway);
    }

    function testConstructorSetsGateway() public {
        assertEq(token.gateway(), gateway);
    }

    function testNameAndSymbol() public {
        assertEq(token.name(), "Bridgeable Token");
        assertEq(token.symbol(), "BRG");
    }
}
