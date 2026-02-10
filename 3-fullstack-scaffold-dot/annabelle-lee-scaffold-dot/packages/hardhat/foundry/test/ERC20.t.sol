//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "forge-std/Test.sol";
import {ERC20Token} from "@contracts/ERC20.sol";

contract ERC20Test is Test {
    ERC20Token token;
    address owner;
    address user1;
    address user2;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        
        token = new ERC20Token("TestToken", "TT", 1000000 * 10**18);
    }

    function testInitialSupply() public {
        assertEq(token.totalSupply(), 1000000 * 10**18);
        assertEq(token.balanceOf(owner), 1000000 * 10**18);
    }

    function testNameAndSymbol() public {
        assertEq(token.name(), "TestToken");
        assertEq(token.symbol(), "TT");
    }

    function testMint() public {
        uint256 amount = 1000 * 10**18;
        token.mint(user1, amount);
        
        assertEq(token.balanceOf(user1), amount);
        assertEq(token.totalSupply(), 1000000 * 10**18 + amount);
    }

    function testTransfer() public {
        uint256 amount = 100 * 10**18;
        token.transfer(user1, amount);
        
        assertEq(token.balanceOf(owner), 1000000 * 10**18 - amount);
        assertEq(token.balanceOf(user1), amount);
    }

    function testApprove() public {
        uint256 amount = 500 * 10**18;
        token.approve(user1, amount);
        
        assertEq(token.allowance(owner, user1), amount);
    }

    function testTransferFrom() public {
        uint256 amount = 200 * 10**18;
        token.approve(user1, amount);
        
        vm.prank(user1);
        token.transferFrom(owner, user2, amount);
        
        assertEq(token.balanceOf(owner), 1000000 * 10**18 - amount);
        assertEq(token.balanceOf(user2), amount);
        assertEq(token.allowance(owner, user1), 0);
    }
}
