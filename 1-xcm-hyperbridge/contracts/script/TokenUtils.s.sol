// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {TestToken} from "../src/TestToken.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CheckBalance is Script {
    address constant TEST_TOKEN = 0x136b7Aa6b01E66e035DCDD9868C3016116b69cA5;

    function run() public view {
        address user = vm.envAddress("USER_ADDRESS");
        
        uint256 balance = IERC20(TEST_TOKEN).balanceOf(user);
        
        console.log("===========================================");
        console.log("TEST Token Balance Check");
        console.log("===========================================");
        console.log("User Address:", user);
        console.log("TEST Balance:", balance / 1e18, "TEST");
        console.log("Raw Balance:", balance);
        console.log("===========================================");
    }
}

contract MintTokens is Script {
    address constant TEST_TOKEN = 0x136b7Aa6b01E66e035DCDD9868C3016116b69cA5;

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address recipient = vm.envAddress("USER_ADDRESS");
        uint256 amount = 1000 ether; // 1000 TEST tokens

        vm.startBroadcast(deployerPrivateKey);

        TestToken(TEST_TOKEN).mint(recipient, amount);
        
        console.log("===========================================");
        console.log("Minted", amount / 1e18, "TEST to", recipient);
        console.log("===========================================");

        vm.stopBroadcast();
    }
}
