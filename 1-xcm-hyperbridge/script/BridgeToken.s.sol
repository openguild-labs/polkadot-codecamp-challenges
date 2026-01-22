// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script, console} from "forge-std/Script.sol";
import {TokenBridge} from "../src/TokenBridge.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BridgeToken is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // ⚠️ Đây là địa chỉ contract bạn vừa deploy thành công
        address bridgeAddress = 0x6a7EDD974851055367763B92fec281d118E54e90;
        
        // Địa chỉ USDh trên BSC Testnet
        address usdhAddress = 0xA801da100bF16D07F668F4A49E1f71fc54D05177;
        
        // Chain ID đích: Sepolia (11155111)
        bytes memory destChain = bytes("EVM-11155111"); 
        
        address recipient = vm.addr(deployerPrivateKey);
        uint256 amount = 1 ether; // 1 USDh

        vm.startBroadcast(deployerPrivateKey);

        // 1. Approve cho Bridge Contract tiêu token USDh
        // (Nếu bạn đã faucet USDh rồi thì bước này mới chạy được)
        IERC20(usdhAddress).approve(bridgeAddress, amount);
        console.log("Approved USDh successfully");

        // 2. Gọi lệnh Bridge
        TokenBridge(bridgeAddress).bridgeTokens(
            usdhAddress, 
            "USD.h",      
            amount,      
            recipient,   
            destChain    
        );

        console.log("Bridge transaction sent successfully!");
        vm.stopBroadcast();
    }
}