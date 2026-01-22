// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "../src/TokenBridge.sol";

contract DeployBridge is Script {
    function run() external {
        // 1. Lấy Private Key từ biến môi trường
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // 2. Cấu hình các tham số cho TokenBridge
        // LƯU Ý: Đây là ví dụ địa chỉ trên Sepolia, bạn cần thay bằng địa chỉ thực tế của Hyperbridge
        address gateway = 0xFcDa26cA021d5535C3059547390E6cCd8De7acA6;
        address feeToken = 0xA801da100bF16D07F668F4A49E1f71fc54D05177; // WETH hoặc Token phí khác

        // 3. Bắt đầu gửi giao dịch lên mạng lưới
        vm.startBroadcast(deployerPrivateKey);

        TokenBridge bridge = new TokenBridge(gateway, feeToken);

        vm.stopBroadcast();

        // Log địa chỉ để bạn dán vào README
        console.log("TokenBridge deployed at:", address(bridge));
    }
}