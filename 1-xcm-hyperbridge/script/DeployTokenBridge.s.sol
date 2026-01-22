// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Import Script từ Foundry
import {Script, console} from "forge-std/Script.sol";
import {TokenBridge} from "../src/TokenBridge.sol";

contract DeployTokenBridge is Script {
    function run() external {
        // 1. Load các biến môi trường
        // Nếu thiếu biến trong file .env, script sẽ báo lỗi ngay lập tức giúp ta biết mà sửa.
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address tokenGateway = vm.envAddress("TOKEN_GATEWAY");
        address feeToken = vm.envAddress("FEE_TOKEN");

        // 2. Bắt đầu transaction
        vm.startBroadcast(deployerPrivateKey);

        // 3. Deploy Contract
        TokenBridge bridge = new TokenBridge(tokenGateway, feeToken);

        // 4. Log địa chỉ để lưu lại nộp bài
        console.log("--------------------------------------------------");
        console.log("TokenBridge deployed successfully!");
        console.log("Deployed Address:", address(bridge));
        console.log("TokenGateway:", tokenGateway);
        console.log("FeeToken:", feeToken);
        console.log("--------------------------------------------------");

        vm.stopBroadcast();
    }
}