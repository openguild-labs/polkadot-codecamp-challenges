// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../src/TokenBridge.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 1. Mock ERC20 (Token giả)
contract MockERC20 is ERC20 {
    constructor() ERC20("Test Token", "TST") {}
    function mint(address to, uint256 amount) public { _mint(to, amount); }
}

// 2. Mock Gateway (Gateway giả - Ai gọi cũng gật đầu OK)
contract SimpleGateway {
    // Fallback: Nhận mọi cuộc gọi và trả về kết quả thành công (bytes32)
    fallback() external payable {
        // Trả về số 1 (dạng bytes32) để giả làm Message ID
        assembly {
            mstore(0, 1) 
            return(0, 32)
        }
    }
}

// 3. Test Chính
contract TokenBridgeTest is Test {
    TokenBridge bridge;
    MockERC20 token;
    MockERC20 feeToken;
    SimpleGateway gateway;
    
    address user = address(0x123);

    function setUp() public {
        token = new MockERC20();
        feeToken = new MockERC20();
        gateway = new SimpleGateway(); // Tạo gateway giả
        bridge = new TokenBridge(address(gateway), address(feeToken));

        // --- QUAN TRỌNG: Cấp tiền cho User ---
        token.mint(user, 1000 ether);      // Cấp Token
        vm.deal(user, 10 ether);           // Cấp ETH thật (để trả phí value: 0.1)

        // User approve cho Bridge tiêu tiền
        vm.startPrank(user);
        token.approve(address(bridge), type(uint256).max);
        feeToken.approve(address(bridge), type(uint256).max);
        vm.stopPrank();
    }

    function testSimpleBridge() public {
        vm.startPrank(user); // Đóng vai User

        // Gọi hàm cầu nối (Gửi kèm 0.1 ETH phí)
        bridge.bridgeTokens{value: 0.1 ether}(
            address(token),
            50 ether,          // Số lượng
            address(0x456),    // Người nhận
            hex"0102"          // Dest Chain
        );

        vm.stopPrank();

        // Kiểm tra: Bridge đã giữ tiền của user chưa?
        assertEq(token.balanceOf(address(bridge)), 50 ether);
    }
}